'use client';
import React from 'react';

// mainTools
import { imageUtils } from '@/lib/api';

// componentes
import { FavoriteButton } from '@/components/atoms/favorite-button';
import { RatingCircle } from '@/components/atoms/rating-circle';
import Image from 'next/image';

// types
import { Movie } from '@/types/movie';
import { FC } from 'react';

interface MovieCardProps {
  movie: Movie;
  className?: string;
  onClick?: (movie: Movie) => void;
}

export const MovieCard: FC<MovieCardProps> = ({
  movie,
  className = '',
  onClick,
}) => {
  const posterUrl = movie.poster_path
    ? imageUtils.getPosterUrl(movie.poster_path, 'w342')
    : '/placeholder-movie.jpg';

  const imageUrl = posterUrl || '/placeholder-movie.jpg';

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Fecha no disponible';

  const handleCardClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  return (
    <div
      className={`
        relative
        bg-gray-800
        rounded-lg
        overflow-hidden
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-xl
        cursor-pointer
        group
        ${className}
      `}
      style={{ width: '200px', height: '335px' }}
      onClick={handleCardClick}
    >
      <div
        className='relative overflow-hidden'
        style={{ width: '200px', height: '223px' }}
      >
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          sizes='200px'
          className='object-cover transition-transform duration-300 group-hover:scale-110'
          loading='lazy'
        />
      </div>

      <div
        className='bg-[#262626] flex flex-col justify-between'
        style={{
          width: '200px',
          height: '112px',
          padding: '8px',
          gap: '8px',
        }}
      >
        <div className='flex flex-col' style={{ gap: '4px' }}>
          <h3 className='text-white font-bold text-sm leading-tight line-clamp-1'>
            {movie?.title || 'Título no disponible'}
          </h3>
          <p className='text-gray-400 text-xs leading-tight'>{releaseYear}</p>
        </div>

        <div className='flex items-center justify-center gap-8 mt-auto'>
          <div
            onClick={(e) => e.stopPropagation()}
            className='flex flex-col items-center gap-1'
          >
            <span className='text-white text-[10px]'>Rating</span>
            <RatingCircle
              rating={movie.vote_average}
              size={24}
              strokeWidth={2}
              showAnimation={false}
            />
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className='flex flex-col items-center gap-1'
          >
            <span className='text-white text-[10px]'>Favorites</span>
            <FavoriteButton movie={movie} size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
