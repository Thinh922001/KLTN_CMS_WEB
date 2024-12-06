export interface IPaging{
        skip?: number,
        take?: number,
        total?: number,
        isNext?: boolean,
        isPrev?: boolean,
        filters?: string | null,
        orders?: string |null
}