import { paypal } from './';
import { PaypalCreateProduct, PaypalCreatePlan, PaypalLoginSubscription, PaypalDirectSubscription } from './models';
import { config } from '../../config';
import nock from 'nock';

const product: PaypalCreateProduct = {
    name: 'test product',
    type: 'DIGITAL',
};

const plan: PaypalCreatePlan = {
    product_id: 'PROD-37N78580DS789784N',
    name: 'Gold Plan',
    billing_cycles: [
        {
            frequency: {
                interval_unit: 'MONTH',
                interval_count: 1
            },
            tenure_type: 'REGULAR',
            sequence: 1,
            total_cycles: 0,
            pricing_scheme: {
                fixed_price: {
                    value: '10',
                    currency_code: 'USD',
                }
            }
        }
    ],
    payment_preferences: {
        setup_fee: {
            value: 0,
            currency_code: 'USD'
        }
    }
};

const subscriptionLogin: PaypalLoginSubscription = {
    plan_id: 'P-0PD93520V38997544L2DQB5Y',
    subscriber: {
        name: {
            given_name: 'John Doe',
            surname: 'Doe'
        },
        email_address: 'johndoe@gmail.com'
    },
    application_context: {
        shipping_preference: 'NO_SHIPPING',
        return_url: 'www.google.com',
        cancel_url: 'www.google.com'
    }
};

const subscriptionDirect: PaypalDirectSubscription = {
    plan_id: 'P-0PD93520V38997544L2DQB5Y',
    subscriber: {
        name: {
            given_name: 'John Doe',
            surname: 'Doe'
        },
        email_address: 'johndoe@gmail.com',
        payment_source: {
            card: {
                number: '349553678050004',
                expiry: '2020-08',
                security_code: '123',
                name: 'John Doe'
            }
        }
    },
};

const { url, client_id, client_secret } = config.paypal;

nock(url, {
    reqheaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})
    .post('/v1/oauth2/token', { 'grant_type': 'client_credentials' })
    .basicAuth({ user: client_id, pass: client_secret })
    .reply(201, { access_token: '12345', expires_in: 1000 });

nock(url, {
    reqheaders: {
        'Content-Type': 'application/json',
    }
})
    .post('/v1/catalogs/products', { ...product })
    .reply(201, { id: 'prod-123' });

nock(url, {
    reqheaders: {
        'Content-Type': 'application/json',
    }
})
    .post('/v1/billing/plans', { ...plan })
    .reply(201, { id: 'p-123', product_id: 'prod-123' });

nock(url, {
    reqheaders: {
        'Content-Type': 'application/json',
    }
})
    .post('/v1/billing/subscriptions', { ...subscriptionLogin })
    .reply(201, { id: 'p-123', plan_id: 'p-123', status: 'APPROVAL_PENDING', links: [{ href: 'www.google.com', rel: 'google', method: 'get' }] });

nock(url, {
    reqheaders: {
        'Content-Type': 'application/json',
    }
})
    .post('/v1/billing/subscriptions', { ...subscriptionDirect })
    .reply(201, { id: 'p-123', plan_id: 'p-123', status: 'APPROVAL_PENDING', links: [{ href: 'www.google.com', rel: 'google', method: 'get' }] });


describe('Test Paypal functionality', () => {

    test('should contain access_token', async () => {
        const authRes = await paypal.getAccessToken({ url, client_id, client_secret });
        expect(Object.keys(authRes)).toEqual(expect.arrayContaining(['access_token']));
    });

    test('should contain product id', async () => {
        const productRes = await paypal.createProduct(product, '12345');
        expect(Object.keys(productRes)).toEqual(expect.arrayContaining(['id']));
    });

    test('should contain plan id, product id', async () => {
        const planRes = await paypal.createPlan(plan, '12345');
        expect(Object.keys(planRes)).toEqual(expect.arrayContaining(['id', 'product_id']));
    });

    test('for login and contain subscription response', async () => {
        const subscriptionRes = await paypal.createSubscription.paypalLoginSubscription(subscriptionLogin, '12345');
        expect(Object.keys(subscriptionRes)).toEqual(expect.arrayContaining(['id', 'plan_id', 'links']));
        expect(Array.isArray(subscriptionRes.links)).toBe(true);
    });

    test('for direct payment and contain subscription response', async () => {
        const subscriptionRes = await paypal.createSubscription.directFlowSubscription(subscriptionDirect, '12345');
        expect(Object.keys(subscriptionRes)).toEqual(expect.arrayContaining(['id', 'plan_id', 'links']));
        expect(Array.isArray(subscriptionRes.links)).toBe(true);
    });

});
