export interface IProduct {
    id?: number;
    deletedAt?: null;
    price?: string;
    discountPercent?: string;
    oldPrice?: string;
    productName?: string;
    product_code?: string;
    img?: string;
    tabs?: string[];
    totalVote?: number;
    starRate?: string;
}


export interface IProductCreate {
    productName?: string;
    productCode?: string;
    tabs?: string[];
    labelsId?: number[];
    variants?: {
        name?: string;
        images?: string[];
        options?: string[];
    }[];
    totalVote?: number;
    starRate?: number;
    price?: number;
    discountPercent?: number;
    oldPrice?: number;
    cateId?: number;
    brandId?: number;
}

export interface IProductUpdate {
    productName?: string;
    product_code?: string;
    tabs?: string[];
    totalVote?: number;
    starRate?: number;
    price?: number;
    discountPercent?: number;
    oldPrice?: number;
    cateId?: number;
    brandId?: number;
}

export interface IProductGet {
    id?: number;
    deletedAt?: null;
    price?: string;
    discountPercent?: string;
    oldPrice?: string;
    productName?: string;
    product_code?: string;
    img?: string | null;
    tabs?: string[];
    totalVote?: number;
    starRate?: string;
    productDetails?: IProductDetailGetFromProduct[]
}

export interface IProductDetailGetFromProduct {
    id?: number,
    deletedAt?: string | null,
    price?: number,
    discountPercent?: number,
    oldPrice?: number,
    stock?: number,
    productDetailsImg?: {
        id?: string,
        img?: string
    }[]
}
