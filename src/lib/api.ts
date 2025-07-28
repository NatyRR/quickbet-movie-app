import axios from 'axios';

export const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const api = axios.create({
  timeout: 50000,
  baseURL: TMDB_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
});

api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      language: 'en-US',
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('TMDB API authentication error - check your access token');
    }
    return Promise.reject(error);
  }
);

export const apiClient = {
  get: (url: string, params?: unknown) => api.get(url, { params }),
  post: (url: string, data?: unknown) => api.post(url, data),
  put: (url: string, data?: unknown) => api.put(url, data),
  patch: (url: string, data?: unknown) => api.patch(url, data),
  delete: (url: string) => api.delete(url),
};

export const imageUtils = {
  getPosterUrl: (
    path: string | null,
    size:
      | 'w92'
      | 'w154'
      | 'w185'
      | 'w342'
      | 'w500'
      | 'w780'
      | 'original' = 'w500'
  ) => {
    if (!path) return null;
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  },

  getBackdropUrl: (
    path: string | null,
    size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'
  ) => {
    if (!path) return null;
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  },
};
