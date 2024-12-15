export interface IOrderUser {
  id?: number;
  status?: EOrderStatus;
  total_amount?: number;
  shipping_address?: string;
}

export interface IOrderUpdate {
  status?: string;
  orderId?: number;
}

export interface IOrder {
  id: number;
  status: string;
  total_amount: number;
  shipping_address: string;
  customer: {
    id: number;
    phone: string;
  };
}

export enum EOrderStatus {
  ALL = 'All',
  PENDING = 'Pending',
  SHIPPED = 'Shipped',
  CONFIRMED = 'Confirmed',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  RETURNED = 'Returned',
  REFUNDED = 'Refunded',
}

export enum OrderStatus {
  ALL = '',
  Pending = 'Pending',
  Processing = 'Processing',
  Returned = 'Returned',
  Canceled = 'Canceled',
  Completed = 'Completed',
}

export enum OrderReturnStatus {
  Pending = 'Pending',
  Resolved = 'Resolve',
  Rejected = 'Rejected',
}
