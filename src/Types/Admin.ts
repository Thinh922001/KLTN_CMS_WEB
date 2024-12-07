export interface IAdmin {
  id?: number;
  email?: string;
  name?: string;
  roleName?: string;
}

export interface ICAdmin {
  email: string;
  name: string;
  roleName: 'ADMIN' | 'SUPPER_AMIN';
  password: string;
  confirmPassword: string;
}
