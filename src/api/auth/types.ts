import { Response } from '../types';

export type RoleName = {
  id: number;
  roleName: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  roles: RoleName[];
  createdAt: number;
  updatedAt: number;
};

// 401
export type Unauthorized = number;

export type AuthUser = Response<User | Unauthorized>;

export type Error = AuthUser;

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export type RegisterCredentialsDTO = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};
