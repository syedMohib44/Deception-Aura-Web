import * as jwt from 'jsonwebtoken';
import { isValidate } from './validatePassword.service';
import { APIError } from '../../utils/error';
import Users from '../../entity/Users';
import { AddAuthenticationDto } from '../../dto/auth/authenticationDto';
import { JWTPAYLOAD } from '../../interface/JWTPayload';
import { config } from '../../config';
import moment from 'moment';

export const authenticateUser = async (addAuthenticationDto: AddAuthenticationDto) => {

    const payload = await preProcessing(addAuthenticationDto);
    const token = jwt.sign(payload, config.jwt_secret as string, { expiresIn: config.jwt_life });
    // const refreshedToken = jwt.sign(payload, config.refresh_jwt_secret as string, { expiresIn: config.refresh_jwt_life })
    // await Users.updateOne({ _id: payload.userId }, { refreshToken: refreshedToken });

    return token;
};

export const logoutUser = async (userId: string) => {
    await Users.updateOne({ _id: userId }, { $unset: { refreshToken: 1 } });
};

export const refreshToken = async (oldToken: string, addAuthenticationDto: AddAuthenticationDto) => {

    if (oldToken) {
        const payload = await preProcessing(addAuthenticationDto);
        const refreshedToken = jwt.sign(payload, config.refresh_jwt_secret as string, { expiresIn: config.refresh_jwt_life });
        await Users.findByIdAndUpdate(payload.userId, { refreshToken: refreshedToken });

        return refreshToken;
    } else {
        throw new APIError(404, { message: 'Token does not exists to be refreshed' });
    }
};


async function preProcessing(addAuthenticationDto: AddAuthenticationDto) {
    const user = await Users
        .findOne({ username: addAuthenticationDto.username })
        //.lean()
        .populate({
            path: 'business',
            populate: {
                path: 'modules.module',
                select: 'name code -_id'
            },
            select: 'name modules isActive'
        });
    if (!user) throw new APIError(401, {
        message: 'Invalid Username or Password'
    });

    const isValid = await isValidate(addAuthenticationDto.password, user.password);
    if (!isValid) throw new APIError(401, {
        message: 'Invalid Username or Password'
    });
    if (!user.business.isActive) {
        throw new APIError(401, {
            message: 'Your account has been deactivated due to subscription cancellation'
        });
    }
    user.lastLogin = moment.utc().format();
    await user.save();  

    const payload: JWTPAYLOAD = {
        userId: user._id,
        typeOfUser: 'owner',
        username: user.username,
        business: user.business // assuming one businness for now, more businesses can be added if required
    };
    return payload;
}
