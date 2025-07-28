import React from 'react';
import { RatingCircle } from '@/components/atoms/rating-circle';
import { FavoriteButton } from '@/components/atoms/favorite-button';
import { Movie } from '@/types/movie';

interface HeroRatingProps {
  movie: Movie;
  className?: string;
  onFavoriteToggle?: (movieId: number, isFavorite: boolean) => void;
}

export const HeroRating: React.FC<HeroRatingProps> = ({
  movie,
  className = '',
  onFavoriteToggle,
}) => {
  return (
    <div className={`flex flex-row items-center gap-3 ${className}`}>
      {/* Rating Circle */}
      <RatingCircle
        rating={movie.vote_average}
        size={65}
        strokeWidth={4}
        showAnimation={true}
      />

      {/* Favorite Button */}
      <FavoriteButton movie={movie} size={32} onToggle={onFavoriteToggle} />
    </div>
  );
};
