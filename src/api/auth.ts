import { ILogin, IRegister, Method } from "../Types/Auth";
import { apiRequest } from "../utils/apiHelper";


export const apiLogin = async (info:ILogin) => {
    return await apiRequest('/admin/auth/login', Method.POST, info);
}

export const apiRegister = async (info:IRegister) => {
    return await apiRequest('/admin/auth/register', Method.POST, info);
}

export const apiRefreshToken = async (refresh_token:string) => {
    return await apiRequest('/admin/auth/refresh_token', Method.POST, {refresh_token});
}