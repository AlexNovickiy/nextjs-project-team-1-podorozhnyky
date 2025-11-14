export interface IStory {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: {
    _id: string;
    name: string;
  };
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
}

// Тип для відповіді з пагінацією
export type PaginatedStoriesResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  data: IStory[];
};

export interface CreateStoryResponse {
  status: number;
  message: string;
  data: IStory;
}

export interface UpdateStoryResponse {
  status: number;
  message: string;
  data: IStory;
}

export interface CreateStory {
  storyImage: string;
  title: string;
  article: string;
  category: string;
}

export interface UpdateStory {
  storyImage?: string;
  title?: string;
  article?: string;
  category?: string;
}
