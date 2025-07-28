'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTrendingMovies } from '@/hooks';
import { imageUtils } from '@/lib/api';

import { FavoriteButton } from '@/components/atoms/favorite-button';
import { RatingCircle } from '@/components/atoms/rating-circle';
import { HeroContent } from '@/components/molecules/hero-content';

interface HeroBannerProps {
  className?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ className = '' }) => {
  const { data: trendingData, isLoading, error } = useTrendingMovies('day');
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const trendingMovies = trendingData?.data?.results || [];
  const heroMovie = trendingMovies[currentMovieIndex];
  useEffect(() => {
    if (trendingMovies.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === trendingMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 30000);

    return () => clearInterval(interval);
  }, [trendingMovies.length, isPaused]);

  useEffect(() => {
    if (currentMovieIndex >= trendingMovies.length) {
      setCurrentMovieIndex(0);
    }
  }, [trendingMovies.length, currentMovieIndex]);

  const handleFavoriteToggle = (movieId: number, isFavorite: boolean) => {
    console.log(`Hero movie ${movieId} favorite toggled: ${isFavorite}`);
  };
  if (isLoading) {
    return (
      <div className={`relative w-full h-[500px] bg-gray-900 ${className}`}>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400'></div>
        </div>
      </div>
    );
  }

  if (error || !heroMovie) {
    return (
      <div className={`relative w-full h-[500px] bg-gray-900 ${className}`}>
        <div className='absolute inset-0 flex items-center justify-center'>
          <p className='text-white text-lg'>Error loading featured movie</p>
        </div>
      </div>
    );
  }

  const backdropUrl = imageUtils.getBackdropUrl(
    heroMovie.backdrop_path,
    'w1280'
  );

  return (
    <div
      className={`relative w-full h-[436px] overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {backdropUrl && (
        <div className='absolute inset-0'>
          <Image
            key={`hero-${heroMovie.id}-${currentMovieIndex}`}
            src={backdropUrl}
            alt={heroMovie.title}
            fill
            className='object-cover object-center transition-opacity duration-500'
            priority
            sizes='100vw'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
        </div>
      )}
      <div
        className='
        relative 
        h-full 
        max-w-[1600px] 
        mx-auto 
        px-4 
        sm:px-6 
        lg:px-8 
        flex 
        flex-col
        justify-end
        pb-12
      '
      >
        <div className='flex items-end justify-between'>
          <div className='flex-1 max-w-4xl'>
            <HeroContent
              key={`hero-content-${heroMovie.id}`}
              title={heroMovie.title}
              overview={heroMovie.overview}
              className='animate-fade-in-up transition-all duration-500'
            />
          </div>
          <div className='flex items-center gap-4 flex-shrink-0 ml-8'>
            <FavoriteButton
              movie={heroMovie}
              size={32}
              onToggle={handleFavoriteToggle}
            />
            <RatingCircle
              rating={heroMovie.vote_average}
              size={65}
              strokeWidth={4}
              showAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
