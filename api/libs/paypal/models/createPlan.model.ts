export interface PaypalCreatePlan {
    product_id: string;
    name: string;
    description?: string;
    /**
     * DEFAULT ACTIVE
     */
    status?: 'ACTIVE' | 'INACTIVE' | 'CREATED';
    billing_cycles: {
        frequency: {
            interval_unit: 'DAY' | 'WEEK' | 'MONTH',
            /**
             * Minimum: 1. Maximum: 365.
             */
            interval_count: number;
        };
        tenure_type: 'REGULAR' | 'TRIAL';
        /**
         * MINIMUM 1, MAXIMUM 24
         */
        sequence: number;
        /**
         * DEFAULT: 1, MINIMUM 0, MAXIMUM 999
         */
        total_cycles?: number;
        pricing_scheme: {
            fixed_price: {
                value: string;
                /**
                 * EXAMPLE: 'USD' -> REFERENCE: https://developer.paypal.com/docs/api/reference/currency-codes/
                 */
                currency_code: string;
            };
        };
    }[];
    payment_preferences: {
        /**
         * DEFAULT true
         */
        auto_bill_outstanding?: boolean;
        setup_fee: {
            value: number;
            /**
             * EXAMPLE: 'USD' -> REFERENCE: https://developer.paypal.com/docs/api/reference/currency-codes/
             */
            currency_code: string;
        },
        /**
         * DEFAULT: CANCEL
         */
        setup_fee_failure_action?: 'CONTINUE' | 'CANCEL';
        /**
         * DEFAULT 0
         */
        payment_failure_threshold?: number;
    };
}

export interface PaypalCreatePlanResponse {
    id: string;
    product_id: string;
}
