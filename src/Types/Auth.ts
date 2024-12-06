export interface IAuth {
    auth: {
        accessToken: string,
        refreshToken: string,
        expired: string,
        tokenType: string
    },
    admin: {
        id: number,
        email: string,
        name: string,
        roleName: string
    }
}

export interface ILogin{
    email: string,
    password: string
}

export interface IRegister{
        email: string,
        name: string,
        password: string,
        confirmPassword: 123456
      
}

export enum Method  {
    GET = 'GET',
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}