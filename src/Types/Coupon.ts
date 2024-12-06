export interface ICoupon {
    id: number,
    discount_value: number,
    discount_type: string,
    expiration_date: string,
    is_active: boolean,
    usage_limit: number,
    times_used: number,
    code:string
}

export interface ICouponCreate {
    code?: string;
    discountValue?: number;
    discountType?: string;
    isActive?: boolean;
    usageLimit?: number;
    validityPeriodInDays?: number;
}
export interface ICouponUpdate {
    discount_value?: number,
    discount_type?: string,
    is_active?: boolean,
    usage_limit?: number,
    validityPeriodInDays?: number,
    code?:string
}

