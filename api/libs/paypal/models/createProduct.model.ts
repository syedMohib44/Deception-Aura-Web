export interface PaypalCreateProduct {
    name: string;
    /**
     * DEFAULT: PHYSICAL
     */
    type: 'PHYSICAL' | 'DIGITAL' | 'SERVICE';
    description?: string;
}

export interface PaypalCreateProductResponse {
    id: string;
}
