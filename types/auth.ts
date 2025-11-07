import { IUser } from './user';

export type AuthResponseRegister = {
  status: number;
  message: string;
  data: {
    user: IUser;
  };
};

export type AuthResponseLogin = {
  status: number;
  message: string;
};

export type AuthResponseLogout = {
  status: number;
  message: string;
};

export type AuthResponseRefresh = {
  success: boolean;
};

export type AuthResponseResetEmail = {
  status: number;
  message: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type ResetEmailCredentials = {
  email: string;
  token: string;
};
