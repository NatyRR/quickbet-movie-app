'use client';

import React from 'react';
import Image from 'next/image';

// utils
import { imageUtils } from '@/lib/api';

// types
import { Movie } from '@/types/movie';
import { FC } from 'react';

interface RecommendationCardProps {
  movie: Movie;
  className?: string;
  onClick?: (movie: Movie) => void;
}

export const RecommendationCard: FC<RecommendationCardProps> = ({
  movie,
  className = '',
  onClick,
}) => {
  const posterUrl = movie.poster_path
    ? imageUtils.getPosterUrl(movie.poster_path, 'w342')
    : '/placeholder-movie.jpg';

  const imageUrl = posterUrl || '/placeholder-movie.jpg';

  const handleCardClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  return (
    <div
      className={`
        relative
        bg-[#3A3A3A]
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
      style={{ width: '200px', height: '272px' }}
      onClick={handleCardClick}
    >
      {/* Imagen - 80% del total (218px) */}
      <div
        className='relative overflow-hidden'
        style={{ width: '200px', height: '218px' }}
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

      {/* Descripción - 20% del total (54px) */}
      <div
        className='bg-[#3A3A3A] flex items-center justify-center'
        style={{
          width: '200px',
          height: '54px',
          padding: '8px',
        }}
      >
        <h3 className='text-white font-bold text-sm leading-tight line-clamp-1 text-center'>
          {movie?.title || 'Título no disponible'}
        </h3>
      </div>
    </div>
  );
};
