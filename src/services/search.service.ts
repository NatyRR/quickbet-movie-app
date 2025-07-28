import { AxiosResponse } from 'axios';
import { apiClient } from '@/lib/api';
import { Movie, SearchMultiResult } from '@/types/movie';
import { TMDBPaginatedResponse } from '@/types/api';

export interface SearchFilters {
  page?: number;
  include_adult?: boolean;
  region?: string;
  year?: number;
  primary_release_year?: number;
}

export const searchService = {
  searchMovies: async (
    query: string,
    page: number = 1,
    filters?: SearchFilters
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    const params: Record<string, unknown> = {
      query: encodeURIComponent(query),
      page,
      include_adult: false,
      ...filters,
    };

    return await apiClient.get('/search/movie', params);
  },

  searchMulti: async (
    query: string,
    page: number = 1,
    includeAdult: boolean = false
  ): Promise<AxiosResponse<TMDBPaginatedResponse<SearchMultiResult>>> => {
    return await apiClient.get('/search/multi', {
      query: encodeURIComponent(query),
      page,
      include_adult: includeAdult,
    });
  },

  searchPerson: async (
    query: string,
    page: number = 1,
    includeAdult: boolean = false
  ): Promise<AxiosResponse<TMDBPaginatedResponse<unknown>>> => {
    return await apiClient.get('/search/person', {
      query: encodeURIComponent(query),
      page,
      include_adult: includeAdult,
    });
  },

  searchCollection: async (
    query: string,
    page: number = 1
  ): Promise<AxiosResponse<TMDBPaginatedResponse<unknown>>> => {
    return await apiClient.get('/search/collection', {
      query: encodeURIComponent(query),
      page,
    });
  },

  searchCompany: async (
    query: string,
    page: number = 1
  ): Promise<AxiosResponse<TMDBPaginatedResponse<unknown>>> => {
    return await apiClient.get('/search/company', {
      query: encodeURIComponent(query),
      page,
    });
  },

  searchKeyword: async (
    query: string,
    page: number = 1
  ): Promise<AxiosResponse<TMDBPaginatedResponse<unknown>>> => {
    return await apiClient.get('/search/keyword', {
      query: encodeURIComponent(query),
      page,
    });
  },
};
