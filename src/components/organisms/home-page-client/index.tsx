'use client';

// mainTools
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// hooks
import { usePopularMovies, useMoviesByGenre, useMovieSearch } from '@/hooks';

// providers
import { useSidebarContext } from '@/providers';

// components
import { MoviesGrid } from '@/components/organisms/movies-grid';

// types
import { Movie } from '@/types/movie';
import { TMDBPaginatedResponse } from '@/types/api';

interface HomePageClientProps {
  initialPopularMovies?: TMDBPaginatedResponse<Movie>;
}

export const HomePageClient: React.FC<HomePageClientProps> = ({
  initialPopularMovies,
}) => {
  const router = useRouter();
  const { searchQuery, selectedGenreId } = useSidebarContext();
  const [currentPage, setCurrentPage] = useState(1);

  // Estabilizar la referencia del initialData para evitar re-renders infinitos
  const stableInitialData = useMemo(
    () => initialPopularMovies,
    [initialPopularMovies]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenreId]);

  const {
    data: popularMoviesData,
    isLoading: popularLoading,
    error: popularError,
  } = usePopularMovies(
    !searchQuery && !selectedGenreId ? currentPage : 1,
    stableInitialData
  );

  const {
    data: genreMoviesData,
    isLoading: genreLoading,
    error: genreError,
  } = useMoviesByGenre(
    selectedGenreId || 0,
    !searchQuery && !!selectedGenreId ? currentPage : 1
  );

  const {
    data: searchMoviesData,
    isLoading: searchLoading,
    error: searchError,
  } = useMovieSearch(
    searchQuery,
    !!searchQuery && searchQuery.length >= 2 ? currentPage : 1
  );

  const { movies, isLoading, error, totalPages, title } = useMemo(() => {
    if (searchQuery && searchQuery.length >= 2) {
      return {
        movies: searchMoviesData?.data?.results || [],
        isLoading: searchLoading,
        error: searchError,
        totalPages: searchMoviesData?.data?.total_pages || 1,
        title: `Search Results for "${searchQuery}"`,
      };
    }

    if (selectedGenreId) {
      return {
        movies: genreMoviesData?.data?.results || [],
        isLoading: genreLoading,
        error: genreError,
        totalPages: genreMoviesData?.data?.total_pages || 1,
        title: `Movies by Genre`,
      };
    }

    return {
      movies: popularMoviesData?.data?.results || [],
      isLoading: popularLoading,
      error: popularError,
      totalPages: popularMoviesData?.data?.total_pages || 1,
      title: 'Popular Movies',
    };
  }, [
    searchQuery,
    selectedGenreId,
    popularMoviesData,
    popularLoading,
    popularError,
    genreMoviesData,
    genreLoading,
    genreError,
    searchMoviesData,
    searchLoading,
    searchError,
  ]);

  const handleMovieClick = (movie: Movie) => {
    router.push(`/movie-details/${movie.id}`);
  };

  return (
    <MoviesGrid
      movies={movies}
      title={title}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      onMovieClick={handleMovieClick}
    />
  );
};
