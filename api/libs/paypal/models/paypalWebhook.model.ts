export interface CreateWebhook {
    url: string;
    event_types: WebhookEventType[];
}

export interface WebhookEventType {
    name: 'BILLING.SUBSCRIPTION.CANCELLED';
}
