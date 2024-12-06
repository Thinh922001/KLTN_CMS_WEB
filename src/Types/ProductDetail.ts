export interface IProductDetailUpdate {
    price?: number,
    discountPercent?: number,
    oldPrice?: number,
    stock?: number
}

export interface IProductDetailGet {
    id?: number,
    deletedAt?: string | number,
    price?: number,
    discountPercent?: number,
    oldPrice?: number,
    stock?: number,
    productDetailsImg?: {
        id?: string,
        img?: string
    }[]
}

export interface IProductDetailGetFromUser {
    name?: string,
    createdAt?: string,
    receiveDate?: string,
    totalAmount?: string,
    finalAmount?: string,
    items?: IProductDetailGetFromUserItem[]
}

export interface IProductDetailGetFromUserItem {
    name?: string,
    img?: string,
    quantity?: number,
    totalAmount?: string
}