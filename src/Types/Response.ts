export interface IResponseApi{
   statusCode: number,
   message: string | string[],
   data: any,
   error:string | null
}