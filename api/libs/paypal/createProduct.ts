import superagent from 'superagent';
import { config } from '../../config';
import { PaypalCreateProduct, PaypalCreateProductResponse } from './models/createProduct.model';

export default async (product: PaypalCreateProduct, accessToken: string): Promise<PaypalCreateProductResponse> => {
    try {
        const { body } = await superagent
            .post(config.paypal.url + '/v1/catalogs/products')
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'application/json')
            .send(product);

        return body;
    } catch (err) {
        throw new Error(err);
    }
};
