export interface PaypalSubscription {
    plan_id: string;
    quantity?: string;
    shipping_amount?: {
        /**
         * EXAMPLE: 'USD' -> REFERENCE: https://developer.paypal.com/docs/api/reference/currency-codes/
         */
        currency_code: string;
        value: string;
    };
}

export interface PaypalLoginSubscription extends PaypalSubscription {
    subscriber: {
        name: {
            given_name: string;
            surname: string;
        },
        email_address: string;
    };
    application_context: {
        /**
         * overrides the business name in the PayPal account on the PayPal site.
         */
        brand_name?: string;
        /**
         * DEFAULT 'GET_FROM_FILE'
         */
        shipping_preference: 'SET_PROVIDED_ADDRESS' | 'NO_SHIPPING' | 'GET_FROM_FILE';
        /**
         * DEFAULT: 'SUBSCRIBE_NOW'
         */
        user_action?: 'SUBSCRIBE_NOW' | 'CONTINUE',
        return_url: string;
        cancel_url: string;
    };
}

export interface PaypalDirectSubscription extends PaypalSubscription {
    subscriber: {
        name: {
            given_name: string;
            surname: string;
        },
        email_address: string;
        payment_source: {
            card: {
                number: string;
                /**
                 * YYYY-MM
                 * Example: 2020-02
                 */
                expiry: string;
                security_code: string;
                name: string;
                billing_address?: {
                    address_line_1?: string;
                    address_line_2?: string;
                    admin_area_1?: string;
                    admin_area_2?: string;
                    postal_code?: string;
                    /**
                     * Example: US
                     * Reference: https://developer.paypal.com/docs/api/reference/country-codes/
                     */
                    country_code: string;
                }
            };
        };
    };
}

export interface PaypalSubscriptionResponse {
    id: string;
    plan_id: string;
    status: 'APPROVAL_PENDING' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED';
    links: {
        href: string;
        rel: string;
        method: string;
    }[];
}

export type paypalLoginFn = (data: PaypalLoginSubscription, accessToken: string) => Promise<PaypalSubscriptionResponse>;
export type paypalDirectFn = (data: PaypalDirectSubscription, accessToken: string) => Promise<PaypalSubscriptionResponse>;
