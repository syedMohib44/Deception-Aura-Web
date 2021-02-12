import superagent from 'superagent';
import { config } from '../../config';
import { PaypalCreatePlan, PaypalCreatePlanResponse } from './models/createPlan.model';

export default async (plan: PaypalCreatePlan, accessToken: string): Promise<PaypalCreatePlanResponse> => {
    try {
        const { body } = await superagent
            .post(config.paypal.url + '/v1/billing/plans')
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'application/json')
            .send(plan);

        return body;
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};
