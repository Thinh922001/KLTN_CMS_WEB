export interface ReturnOrder {
  id: number;
  status: string;
  isApprove: boolean;
  reason: string;
  quantity: number;
  returnPrice: number;
  phone: string;
  productName: string;
}
