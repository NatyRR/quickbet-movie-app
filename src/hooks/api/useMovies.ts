// mainTools
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// services
import { moviesService, MovieFilters } from '@/services';

// types
import { TMDBPaginatedResponse } from '@/types/api';
import {
  Movie,
  MovieDetails,
  TMDBVideosResponse,
  TMDBCreditsResponse,
} from '@/types/movie';

export const MOVIE_QUERY_KEYS = {
  all: ['movies'] as const,
  popular: (page: number) =>
    [...MOVIE_QUERY_KEYS.all, 'popular', page] as const,
  nowPlaying: (page: number, region: string) =>
    [...MOVIE_QUERY_KEYS.all, 'nowPlaying', page, region] as const,
  upcoming: (page: number, region: string) =>
    [...MOVIE_QUERY_KEYS.all, 'upcoming', page, region] as const,
  topRated: (page: number) =>
    [...MOVIE_QUERY_KEYS.all, 'topRated', page] as const,
  trending: (timeWindow: string) =>
    [...MOVIE_QUERY_KEYS.all, 'trending', timeWindow] as const,
  details: (id: number) => [...MOVIE_QUERY_KEYS.all, 'details', id] as const,
  byGenre: (genreId: number, page: number) =>
    [...MOVIE_QUERY_KEYS.all, 'byGenre', genreId, page] as const,
  discover: (filters: MovieFilters) =>
    [...MOVIE_QUERY_KEYS.all, 'discover', filters] as const,
  recommendations: (id: number, page: number) =>
    [...MOVIE_QUERY_KEYS.all, 'recommendations', id, page] as const,
  similar: (id: number, page: number) =>
    [...MOVIE_QUERY_KEYS.all, 'similar', id, page] as const,
};

export const usePopularMovies = (
  page: number = 1,
  initialData?: TMDBPaginatedResponse<Movie>
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.popular(page),
    queryFn: () => moviesService.getPopular(page),
    initialData:
      page === 1 && initialData
        ? ({ data: initialData } as AxiosResponse<TMDBPaginatedResponse<Movie>>)
        : undefined,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useNowPlayingMovies = (
  page: number = 1,
  region: string = 'US'
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.nowPlaying(page, region),
    queryFn: () => moviesService.getNowPlaying(page, region),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useUpcomingMovies = (
  page: number = 1,
  region: string = 'US'
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.upcoming(page, region),
    queryFn: () => moviesService.getUpcoming(page, region),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useTopRatedMovies = (
  page: number = 1
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.topRated(page),
    queryFn: () => moviesService.getTopRated(page),
    staleTime: 1000 * 60 * 60, // 1 hour (top rated changes slowly)
    gcTime: 1000 * 60 * 90, // 1.5 hours
  });
};

export const useTrendingMovies = (
  timeWindow: 'day' | 'week' = 'day'
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.trending(timeWindow),
    queryFn: () => moviesService.getTrending(timeWindow),
    staleTime: timeWindow === 'day' ? 1000 * 60 * 5 : 1000 * 60 * 60 * 6, // 5min for day, 6h for week
    gcTime: timeWindow === 'day' ? 1000 * 60 * 15 : 1000 * 60 * 60 * 12, // 15min for day, 12h for week
  });
};

export const useMovieDetails = (
  movieId: number,
  appendToResponse?: string
): UseQueryResult<AxiosResponse<MovieDetails>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.details(movieId),
    queryFn: () => moviesService.getDetails(movieId, appendToResponse),
    enabled: !!movieId && movieId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 120, // 2 hours
  });
};

export const useMoviesByGenre = (
  genreId: number,
  page: number = 1,
  sortBy: string = 'popularity.desc'
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.byGenre(genreId, page),
    queryFn: () => moviesService.getByGenre(genreId, page, sortBy),
    enabled: !!genreId && genreId > 0,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useDiscoverMovies = (
  filters?: MovieFilters
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.discover(filters || {}),
    queryFn: () => moviesService.discoverMovies(filters),
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
  });
};

export const useMovieRecommendations = (
  movieId: number,
  page: number = 1
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.recommendations(movieId, page),
    queryFn: () => moviesService.getRecommendations(movieId, page),
    enabled: !!movieId && movieId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 120, // 2 hours
  });
};

export const useSimilarMovies = (
  movieId: number,
  page: number = 1
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> => {
  return useQuery({
    queryKey: MOVIE_QUERY_KEYS.similar(movieId, page),
    queryFn: () => moviesService.getSimilar(movieId, page),
    enabled: !!movieId && movieId > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 120, // 2 hours
  });
};

export const useMovieVideos = (
  movieId: number
): UseQueryResult<AxiosResponse<TMDBVideosResponse>, Error> => {
  return useQuery({
    queryKey: [...MOVIE_QUERY_KEYS.details(movieId), 'videos'],
    queryFn: () => moviesService.getVideos(movieId),
    enabled: !!movieId && movieId > 0,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (videos rarely change)
    gcTime: 1000 * 60 * 60 * 48, // 48 hours
  });
};

export const useMovieCredits = (
  movieId: number
): UseQueryResult<AxiosResponse<TMDBCreditsResponse>, Error> => {
  return useQuery({
    queryKey: [...MOVIE_QUERY_KEYS.details(movieId), 'credits'],
    queryFn: () => moviesService.getCredits(movieId),
    enabled: !!movieId && movieId > 0,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (credits rarely change)
    gcTime: 1000 * 60 * 60 * 48, // 48 hours
  });
};
