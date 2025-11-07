export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  description: string;
  favorites: string[];
  articlesAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IApiResponse {
  data: { user: IUser };
}

export type PaginatedUsersResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: IUser[];
};

export interface UpdateUser {
  description?: string;
  userPhoto?: string;
}
