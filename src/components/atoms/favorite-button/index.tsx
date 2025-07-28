'use client';
import React from 'react';

// icons
import { Heart } from 'lucide-react';

// hooks
import { useFavorites } from '@/hooks';

// types
import { Movie, MovieDetails } from '@/types/movie';
import { FC } from 'react';

interface FavoriteButtonProps {
  movie: Movie | MovieDetails;
  size?: number;
  className?: string;
  onToggle?: (movieId: number, isFavorite: boolean) => void;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  movie,
  size = 24,
  className = '',
  onToggle,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!movie || !movie.id) {
    return null;
  }

  const movieIsFavorite = isFavorite(movie.id);

  const handleClick = () => {
    const movieForFavorites: Movie = {
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
      genre_ids:
        'genres' in movie ? movie.genres.map((g) => g.id) : movie.genre_ids,
      id: movie.id,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      video: movie.video,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
    };

    toggleFavorite(movieForFavorites);

    if (onToggle) {
      onToggle(movie.id, !movieIsFavorite);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        transition-all 
        duration-200 
        hover:scale-110 
        active:scale-95
        ${className}
      `}
      aria-label={
        movieIsFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'
      }
    >
      <Heart
        size={size}
        className={`
          transition-colors 
          duration-200
          ${
            movieIsFavorite
              ? 'fill-red-500 text-red-500'
              : 'fill-white text-white hover:text-red-400'
          }
        `}
      />
    </button>
  );
};
