export interface IOrderUser {
    id?: number,
    status?: string,
    total_amount?: number,
    shipping_address?: string
}

export interface IOrderUpdate{
    status?:string,
    orderId?:number
}

export enum EOrderStatus {
    ALL = 'All',
    PENDING = 'Pending',
    SHIPPED = 'Shipped',
    CONFIRMED = 'Confirmed',
    DELIVERED = 'Delivered',
    CANCELLED = 'Cancelled',
    RETURNED = 'Returned',
    REFUNDED = 'Refunded'
}