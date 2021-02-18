import bcrypt from 'bcryptjs';
import Joi from '@hapi/joi';
import moment from 'moment';
import { validate } from '../../libs/validator/validate';
import Users, { IUsers } from '../../entity/Users';
import { AddOwnerDto } from '../../dto/auth/addOwnerDto';
import { APIError } from '../../utils/error';
import { config } from '../../config';
import Business from '../../entity/Businesses';
import { generateRandomString } from '../../utils/commonHelper';
import { sendMail } from '../../libs/mail/mail';
import Businesses from '../../entity/Businesses';

export const insertUserAsOwner = async (addOwnerDto: AddOwnerDto) => {
    await ownerSignupValidation(addOwnerDto);
    
    // save business
    const business = new Business();
    business.name = addOwnerDto.businessName;
    const savedBusiness = await business.save();

    // save user
    const tempPassword = generateRandomString(8);
    if (config.mode === 'dev') {
        console.log('Password is', tempPassword);
    }
    const hashedPassword = await bcrypt.hash(tempPassword, bcrypt.genSaltSync(10));
    const user = new Users();
    user.firstName = addOwnerDto.firstName;
    user.lastName = addOwnerDto.lastName;
    user.username = addOwnerDto.username;
    user.password = hashedPassword;
    user.typeOfUser = 'owner';
    user.business = business;
    const savedUser = await user.save();

    sendSuccessSignupMail(user, tempPassword);

    return { tempPassword, business: savedBusiness, user: savedUser };
};

export const sendSuccessSignupMail = (user: IUsers, tempPassword: string, bcc: string | string[] = []) => {
    sendMail({
        subject: 'Sign In',
        to: user.username,
        template: 'owner-signup',
        context: {
            fullName: user.fullName,
            username: user.username,
            tempPassword,
            signinUrl: config.client_url.owner_url + '/signin'
        },
        bcc,
    })
        .then(console.log)
        .catch(console.error);
};

export const usernameExists = async (username: string): Promise<boolean> => {
    const alreadyExists = await Users.findOne({ username });
    return alreadyExists ? true : false;
};

export const businessNameExists = async (businessName: string): Promise<boolean> => {
    const dbBusinessName = await Businesses.findOne({ name: businessName });
    return dbBusinessName ? true : false;
};

export const ownerSchema = {
    firstName: Joi.string()
        .required(),
    lastName: Joi.string()
        .required(),
    username: Joi.string()
        .email()
        .required(),
    businessName: Joi.string()
        .required()
};

export const ownerSignupValidation = async (value: AddOwnerDto) => {
    const schema = Joi.object(ownerSchema);

    const { error } = validate(schema, value);
    if (error) throw error;

    if (await usernameExists(value.username)) {
        throw new APIError(400, {
            message: 'Email exists'
        });
    }
};

export const ownerSignupValidationWithCard = async (value: AddOwnerDto) => {
    const schema = Joi.object({
        ...ownerSchema,
        card: {
            number: Joi.string().required(),
            expiry: Joi.string()
                .pattern(new RegExp('^[0-9]{2}/[0-9]{4}$'))
                .required(),
            security_code: Joi.string()
                .required()
        }
    });

    const { error } = validate(schema, value);
    if (error) throw error;

    await throwOnDuplicateOwner(value.username, value.businessName);
};

const throwOnDuplicateOwner = async (email: string, businessName: string) => {
    const [
        isDuplicateEmail,
        isDuplicateBusinessName,
    ] = await Promise.all([
        usernameExists(email),
        businessNameExists(businessName),
    ]);

    if (isDuplicateEmail) {
        throw new APIError(400, {
            message: 'Username exists'
        });
    }

    if (isDuplicateBusinessName) {
        throw new APIError(400, {
            message: 'Business name exists'
        });
    }
};
