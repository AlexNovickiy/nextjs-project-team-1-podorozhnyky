import { IStory } from './story';
import { IPagination } from './pagination';
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
  data: {
    users: IUser[];
    pageInfo: {
      total: number;
      page: number;
      perPage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
};

export interface UpdateUser {
  description?: string;
  userPhoto?: string;
}

export type GetUserByIdResponse = {
  status: number;
  message: string;
  data: {
    user: IUser | null;
    articles: IStory[];
  };
} & IPagination;
