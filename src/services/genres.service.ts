import { AxiosResponse } from 'axios';
import { apiClient } from '@/lib/api';
import { GenreList } from '@/types/movie';

export const genresService = {
  getMovieGenres: async (): Promise<AxiosResponse<GenreList>> => {
    return await apiClient.get('/genre/movie/list');
  },

  getTVGenres: async (): Promise<AxiosResponse<GenreList>> => {
    return await apiClient.get('/genre/tv/list');
  },
};
