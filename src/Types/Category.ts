export interface ICategory {
  id: number;
  img?: string;
  name: string;
}

export interface ICategoryUpdate {
  cateId: number;
  name: string;
  cateTypeId?: number;
}

export interface ICateType {
  id: number;
  name: string;
}

export interface ICateTypeUpdate {
  id: number;
  name: string;
}

export interface ICateTypeCreate {
  name: string;
}
