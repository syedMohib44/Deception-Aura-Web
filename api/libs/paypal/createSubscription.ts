import superagent from 'superagent';
import { config } from '../../config';
import { PaypalSubscription, PaypalSubscriptionResponse, paypalLoginFn, paypalDirectFn } from './models/createSubscription.model';

const makeSubscription = async (subscription: PaypalSubscription, accessToken: string): Promise<PaypalSubscriptionResponse> => {
    try {
        const { body } = await superagent
            .post(config.paypal.url + '/v1/billing/subscriptions')
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'application/json')
            .send(subscription);

        return body;
    } catch (err) {
        console.log(JSON.stringify(err, null, 2));
        throw new Error(err);
    }
};

const paypalLoginSubscription: paypalLoginFn = makeSubscription;


const directFlowSubscription: paypalDirectFn = makeSubscription;

export default {
    /**
     * Requires paypal login
     */
    paypalLoginSubscription,
    /**
     * Works with direct debit/credit card
     */
    directFlowSubscription
};
