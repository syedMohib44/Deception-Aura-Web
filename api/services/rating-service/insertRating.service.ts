import { AddRatingsDto } from "../../dto/rating/addRatingsDto";
import Ratings from "../../entity/Ratings"
import Users from "../../entity/Users";
import { sendMail } from "../../libs/mail/mail";
import { APIError } from "../../utils/error";

export const insertRating = async (addRatingsDto: AddRatingsDto) => {
    const businessOwner = await Users.findOne({ business: addRatingsDto.business }).lean();
    if (!businessOwner)
        throw new APIError(404, { message: 'Business not found' });

    const rating = new Ratings();
    rating.name = addRatingsDto.name;
    rating.username = addRatingsDto.username ?? addRatingsDto.username;
    rating.stars = addRatingsDto.stars;
    rating.prodcut = addRatingsDto.product;
    rating.comment = addRatingsDto.comment ?? addRatingsDto.comment;
    await rating.save();

    sendMail({
        subject: `Feedback from ${rating.name}`,
        to: businessOwner.username,
        context: {
            productName: addRatingsDto.productName,
        }
    });

    if (rating.username) {
        sendMail({
            subject: 'Thanks for your feedback',
            to: rating.username,
            context: {
                productName: addRatingsDto.productName,
            }
        });
    }
}