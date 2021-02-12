export interface PaypalAuth {
    url: string;
    client_id: string;
    client_secret: string;
}

export interface PaypalAuthResponse {
    access_token: string;
    expires_in: number;
}
