import { Request, Response } from 'express';
import { CronJob } from 'cron'
import Transactions from '../../entity/Transactions';
import Businesses from '../../entity/Businesses';
import { sendMail } from '../mail/mail';
import moment from 'moment';
import Users from "../../entity/Users"
import { config } from "../../config";


//Runs every 7 days (0 23 * * */6)
// export const job = new CronJob('0 0 7 */3 7', () => {
//     //SendMailAfterUnsubscribe();
// })

export const SendMailAfterUnsubscribe = async (req: Request, res: Response) => {
    const promises = [];
    try {
        //TODO: Will run cron job every day to check if business is inActive. 
        const businesses = await Businesses.find({ isActive: false }).lean();
        const transactions = await Transactions.find(
            { business: { $in: businesses.map(b => b._id) }, paymentStatus: 'Complete' }).lean();

        const forOwnerArr = [];
        for (const business of businesses) {
            let username = '';
            for (const transaction of transactions) {
                if (String(business._id) === String(transaction.business._id)) {
                    username = transaction.addedBy?.username ? transaction.addedBy?.username : '';
                    if (transaction.products) {
                        for (const product of transaction.products) {
                            const products = {
                                name: product.name,
                                price: product.price
                            };
                            const forOwner = {
                                paymentStatus: transaction.paymentStatus,
                                paymentProvide: transaction.paymentSystem?.paymentProvider,
                                paymentMethod: transaction.paymentSystem?.method,
                                type: transaction.type,
                                total: transaction.total,
                                product: products,
                                paymentTime: moment.utc(transaction.updatedAt).format('LLLL')
                            }
                            forOwnerArr.push(forOwner);
                        }
                    }
                }
            }
            const emailContext = {
                data: forOwnerArr
            }
            const businessName = business.name ? business.name : '';
            const businessAddress = (business.address && business.address.street) ? business.address?.street : '';

            promises.push(sendMail({
                subject: `${businessName} ${businessAddress}`,
                to: username,
                bcc: config.mail.bcc,
                context: emailContext,
                template: 'business-data',
            }).catch(err => console.log(err)));
        }
        await Promise.all(promises);
        await Promise.all(businesses.map(business => { Businesses.remove(business) }));
        res.sendStatus(204);

    } catch (err) {
        throw err;
    }
}

export const DemoLoginValidate = async (req: Request, res: Response) => {
    const users = await Users.find({ isDemoAccount: true });
    const inActiveUsers = users.map(user => {
        let warnDate = moment.utc(user.lastLogin).add(3, 'months').format(); 
        let currentDate = moment.utc().format();
        if ((warnDate <= currentDate) && user.isActive) {
            user.lastLogin = moment.utc().toDate(); //New date(user removal start date) after warining is sent
            user.isActive = false;
            const emailContext = {
                singInUrl: config.client_url.ecommerce_url + `/activate-account/${user.username}`
            }
            sendMail({
                subject: 'Account Disconnect',
                to: user.username,
                bcc: config.mail.bcc,
                context: emailContext,
                template: 'sales-login-warning'
            });
            //console.log(user);
            return user.save();
        }
        warnDate = moment.utc(user.lastLogin).add(1, 'week').format();
        //This mail mail will be sent one time if want every day till 7 days can do nested
        //if check... Last login is modified to not use extra variable for after 3 months validation...
        if ((warnDate <= currentDate) && !user.isActive) {
            //console.log(user);
            return user.remove();
        }
    });
    Promise.all(inActiveUsers);
    res.sendStatus(204);
}