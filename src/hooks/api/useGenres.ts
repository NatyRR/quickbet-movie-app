import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { genresService } from '@/services';
import { GenreList, Genre } from '@/types/movie';

export const GENRE_QUERY_KEYS = {
  all: ['genres'] as const,
  movie: () => [...GENRE_QUERY_KEYS.all, 'movie'] as const,
  tv: () => [...GENRE_QUERY_KEYS.all, 'tv'] as const,
};

export const useMovieGenres = (): UseQueryResult<
  AxiosResponse<GenreList>,
  Error
> => {
  return useQuery({
    queryKey: GENRE_QUERY_KEYS.movie(),
    queryFn: genresService.getMovieGenres,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (genres rarely change)
    gcTime: 1000 * 60 * 60 * 48, // 48 hours
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useTVGenres = (): UseQueryResult<
  AxiosResponse<GenreList>,
  Error
> => {
  return useQuery({
    queryKey: GENRE_QUERY_KEYS.tv(),
    queryFn: genresService.getTVGenres,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (genres rarely change)
    gcTime: 1000 * 60 * 60 * 48, // 48 hours
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useGenreById = (genreId: number): Genre | undefined => {
  const { data: genresData } = useMovieGenres();

  return useMemo(() => {
    if (!genresData?.data?.genres || !genreId) return undefined;
    return genresData.data.genres.find((genre) => genre.id === genreId);
  }, [genresData, genreId]);
};

export const useGenresByIds = (genreIds: number[]): Genre[] => {
  const { data: genresData } = useMovieGenres();

  return useMemo(() => {
    if (!genresData?.data?.genres || !genreIds?.length) return [];

    return genreIds
      .map((id) => genresData.data.genres.find((genre) => genre.id === id))
      .filter((genre): genre is Genre => Boolean(genre));
  }, [genresData, genreIds]);
};

export const useGenreMap = (): Record<number, Genre> => {
  const { data: genresData } = useMovieGenres();

  return useMemo(() => {
    if (!genresData?.data?.genres) return {};

    return genresData.data.genres.reduce(
      (acc, genre) => {
        acc[genre.id] = genre;
        return acc;
      },
      {} as Record<number, Genre>
    );
  }, [genresData]);
};

export const usePopularGenres = (limit?: number): Genre[] => {
  const { data: genresData } = useMovieGenres();

  return useMemo(() => {
    if (!genresData?.data?.genres) return [];

    const popularGenreIds = [
      28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878,
      10770, 53, 10752, 37,
    ];

    const sortedGenres = genresData.data.genres.sort((a, b) => {
      const aIndex = popularGenreIds.indexOf(a.id);
      const bIndex = popularGenreIds.indexOf(b.id);

      if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;

      return aIndex - bIndex;
    });

    return limit ? sortedGenres.slice(0, limit) : sortedGenres;
  }, [genresData, limit]);
};
