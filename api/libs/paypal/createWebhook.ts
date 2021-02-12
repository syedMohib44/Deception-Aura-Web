import superagent from 'superagent';
import { config } from '../../config';
import { CreateWebhook } from './models';

export default async (plan: CreateWebhook, accessToken: string): Promise<void> => {
    try {
        await superagent
            .post(config.paypal.url + '/v1/notifications/webhooks')
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'application/json')
            .send(plan);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};
