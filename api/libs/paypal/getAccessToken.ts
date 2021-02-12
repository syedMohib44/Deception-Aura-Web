import superagent from 'superagent';
import { PaypalAuth, PaypalAuthResponse } from './models/createAuth.model';

export default async ({ url, client_id, client_secret }: PaypalAuth): Promise<PaypalAuthResponse> => {
    try {
        const { body } = await superagent
            .post(url + '/v1/oauth2/token')
            .set('Content-Type', 'application/json')
            .auth(client_id, client_secret, { type: 'basic' })
            .type('form')
            .send({ 'grant_type': 'client_credentials' });

        return body;
    } catch (err) {
        throw new Error(err);
    }
};
