// mainTools
import { AxiosResponse } from 'axios';
import { apiClient } from '@/lib/api';

// types
import { TMDBPaginatedResponse } from '@/types/api';
import {
  Movie,
  MovieDetails,
  TMDBVideosResponse,
  TMDBCreditsResponse,
} from '@/types/movie';

export interface MovieFilters {
  page?: number;
  region?: string;
  with_genres?: number | string;
  sort_by?:
    | 'popularity.desc'
    | 'popularity.asc'
    | 'release_date.desc'
    | 'release_date.asc'
    | 'vote_average.desc'
    | 'vote_average.asc';
  vote_count_gte?: number;
  primary_release_year?: number;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
}

export const moviesService = {
  getPopular: async (
    page: number = 1
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    return await apiClient.get('/movie/popular', { page });
  },

  getNowPlaying: async (
    page: number = 1,
    region: string = 'US'
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    return await apiClient.get('/movie/now_playing', { page, region });
  },

  getUpcoming: async (
    page: number = 1,
    region: string = 'US'
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    return await apiClient.get('/movie/upcoming', { page, region });
  },

  getTopRated: async (
    page: number = 1
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    return await apiClient.get('/movie/top_rated', { page });
  },

  getTrending: async (
    timeWindow: 'day' | 'week' = 'day'
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    return await apiClient.get(`/trending/movie/${timeWindow}`);
  },

  getDetails: async (
    movieId: number,
    appendToResponse: string = 'videos,credits,recommendations,similar'
  ): Promise<AxiosResponse<MovieDetails>> => {
    return await apiClient.get(`/movie/${movieId}`, {
      append_to_response: appendToResponse,
    });
  },

  discoverMovies: async (
    filters?: MovieFilters
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    const params: Record<string, unknown> = {};

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params[key] = value.toString();
        }
      });
    }

    return await apiClient.get('/discover/movie', params);
  },

  getByGenre: async (
    genreId: number,
    page: number = 1,
    sortBy: string = 'popularity.desc'
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    return await apiClient.get('/discover/movie', {
      with_genres: genreId,
      sort_by: sortBy,
      page,
      vote_count_gte: 100,
    });
  },

  getRecommendations: async (
    movieId: number,
    page: number = 1
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    return await apiClient.get(`/movie/${movieId}/recommendations`, { page });
  },

  getSimilar: async (
    movieId: number,
    page: number = 1
  ): Promise<AxiosResponse<TMDBPaginatedResponse<Movie>>> => {
    return await apiClient.get(`/movie/${movieId}/similar`, { page });
  },

  getVideos: async (
    movieId: number
  ): Promise<AxiosResponse<TMDBVideosResponse>> => {
    return await apiClient.get(`/movie/${movieId}/videos`);
  },

  getCredits: async (
    movieId: number
  ): Promise<AxiosResponse<TMDBCreditsResponse>> => {
    return await apiClient.get(`/movie/${movieId}/credits`);
  },
};
