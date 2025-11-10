// lib/api/clientApi.ts
import { nextServer } from './api';
import {
  IApiResponse,
  IUser,
  PaginatedUsersResponse,
  UpdateUser,
} from '@/types/user';
import {
  PaginatedStoriesResponse,
  IStory,
  CreateStoryResponse,
  UpdateStoryResponse,
  UpdateStory,
  CreateStory,
} from '@/types/story';
import { ICategory } from '@/types/category';
import {
  AuthResponseRefresh,
  AuthResponseRegister,
  AuthResponseLogin,
  AuthResponseLogout,
  LoginCredentials,
  RegisterCredentials,
} from '@/types/auth';

// === AUTH ===

export const login = async (credentials: LoginCredentials) => {
  const { data } = await nextServer.post<AuthResponseLogin>(
    '/auth/login',
    credentials
  );
  return data;
};

export const register = async (credentials: RegisterCredentials) => {
  const { data } = await nextServer.post<AuthResponseRegister>(
    '/auth/register',
    credentials
  );
  return data;
};

export const logout = async (): Promise<AuthResponseLogout> => {
  const { data } = await nextServer.post<AuthResponseLogout>('/auth/logout');
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await nextServer.post<AuthResponseRefresh>('/auth/session');
  return data.success;
};

// /me/current
export const fetchCurrentUser = async (): Promise<IApiResponse> => {
  const { data } = await nextServer.get<IApiResponse>('/users/me');
  return data;
};

// === STORIES  ===
export const fetchStories = async (
  perPage: number,
  page: number,
  category: ICategory | null
): Promise<PaginatedStoriesResponse> => {
  const { data } = await nextServer.get('/stories', {
    params: {
      perPage,
      page,
      category: category?.name,
    },
  });
  return data.data;
};

export const fetchStoryById = async (storyId: string): Promise<IStory> => {
  const { data } = await nextServer.get<IStory>(`/stories/${storyId}`);
  return data;
};

export const createStory = async (
  storyData: CreateStory
): Promise<CreateStoryResponse> => {
  const { data } = await nextServer.post<CreateStoryResponse>(
    '/stories',
    storyData
  );
  return data;
};

export const updateStory = async (
  storyId: string,
  storyData: UpdateStory
): Promise<UpdateStoryResponse> => {
  const { data } = await nextServer.put<UpdateStoryResponse>(
    `/stories/${storyId}`,
    storyData
  );
  return data;
};

// === USERS (AUTHORS) ===
export const fetchAuthors = async (
  params: URLSearchParams
): Promise<PaginatedUsersResponse> => {
  const { data } = await nextServer.get<PaginatedUsersResponse>('/users', {
    params,
  });
  return data;
};

export const fetchAuthorById = async (
  userId: string
): Promise<IApiResponse> => {
  const { data } = await nextServer.get(`/users/${userId}`);
  return data;
};

export const updateProfile = async (
  profileData: UpdateUser
): Promise<IUser> => {
  const { data } = await nextServer.put<IUser>('/me/profile', profileData);
  return data;
};

export const addFavorite = async (storyId: string): Promise<IUser> => {
  const { data } = await nextServer.post<IUser>(`/me/favorites/${storyId}`);
  return data;
};

export const removeFavorite = async (storyId: string): Promise<IUser> => {
  const { data } = await nextServer.delete<IUser>(`/me/favorites/${storyId}`);
  return data;
};

// === CATEGORIES (Новий каркас) ===
export const fetchCategories = async (): Promise<ICategory[]> => {
  const { data } = await nextServer.get<ICategory[]>('/categories');
  return data;
};

export const fetchCategoryById = async (id: string): Promise<ICategory> => {
  const { data } = await nextServer.get(`/categories/${id}`);
  return data.data;
};
