export interface PurchaseRequest {
  paymentType: string;
  amount: number;
  telecomServiceId: string;
  monthlySubscription: boolean;
}