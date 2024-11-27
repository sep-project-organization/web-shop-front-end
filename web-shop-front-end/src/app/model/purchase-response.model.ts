export interface PurchaseResponse{
    message: string,
    status: string;
    paymentUrl: string;
    paymentId: string;
    port: string;
    merchantPan: string;
    redirectionUrl: string;
}