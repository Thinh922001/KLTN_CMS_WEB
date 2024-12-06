export interface ICategory {
  id: number;
  img?: string;
  name: string;
}

export interface ICategoryUpdate {
  cateId: number;
  name: string;
}
