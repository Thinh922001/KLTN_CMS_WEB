import { IProductCreate, IProductUpdate } from '@/Types/Product';
import { apiRequestRefeshToken } from './..//utils/apiHelperRefeshToken';
import { Method } from './../Types/Auth';



export const get_all_product = async (take:number = 5, skip:number = 0, brandId:number, cateId:number) => {
    return await apiRequestRefeshToken(`/product?take=${take}&skip=${skip}&brandId=${brandId}&cateId=${cateId}`, Method.GET)
}

export const get_product_by_id = async (id:number) => {
    return await apiRequestRefeshToken(`/product/${id}`, Method.GET)
}

export const create_product = async (product:IProductCreate) => {
    return await apiRequestRefeshToken('/product', Method.POST, product)
}

export const upload_image_product = async (productId:number, img:File) => {
    const formData = new FormData();
    formData.append('img', img);
    formData.append('productId', productId.toString());
    return await apiRequestRefeshToken(`/product/upload`, Method.POST, formData);
}

export const update_product = async (productId:number, product:IProductUpdate) => {
    return await apiRequestRefeshToken(`/product/${productId}`, Method.PUT, product)
}

export const delete_product = async (productId:number) => {
    return await apiRequestRefeshToken(`/product/${productId}`, Method.DELETE)
}

export const restore_product = async (productId:number) => {
    return await apiRequestRefeshToken(`/product/${productId}`, Method.PATCH)
}
