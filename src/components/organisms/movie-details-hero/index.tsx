'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Play } from 'lucide-react';

// utils
import { imageUtils } from '@/lib/api';

// components
import { RatingCircle } from '@/components/atoms/rating-circle';
import { FavoriteButton } from '@/components/atoms/favorite-button';

// types
import { MovieDetails } from '@/types/movie';

interface MovieDetailsHeroProps {
  movie: MovieDetails;
}

export const MovieDetailsHero: React.FC<MovieDetailsHeroProps> = ({
  movie,
}) => {
  const router = useRouter();

  const backdropUrl = imageUtils.getBackdropUrl(
    movie.backdrop_path,
    'original'
  );
  const posterUrl = imageUtils.getPosterUrl(movie.poster_path, 'w500');

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min.`
    : '';

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className='relative min-h-screen lg:h-full'>
      {/* Background Image */}
      {backdropUrl && (
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundPosition: 'center 30%',
            backgroundSize: 'cover',
          }}
        >
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50' />
        </div>
      )}

      {/* Content */}
      <div className='relative z-10 container mx-auto px-6 py-4 lg:py-6 h-full flex flex-col'>
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className='flex items-center gap-2 text-white hover:text-yellow-400 transition-colors mb-4 lg:mb-6 flex-shrink-0'
        >
          <ArrowLeft size={24} />
          <span className='text-lg'>Back</span>
        </button>

        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-8 items-start flex-1 min-h-0'>
          {/* Poster + Trailer Button */}
          <div className='flex-shrink-0 flex flex-col gap-2'>
            {/* Poster */}
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={movie.title}
                width={288}
                height={432}
                className='w-60 lg:w-72 h-auto max-h-80 lg:max-h-96 object-cover shadow-2xl'
                priority
              />
            ) : (
              <div className='w-60 lg:w-72 h-[360px] lg:h-[432px] bg-gray-800 flex items-center justify-center'>
                <span className='text-gray-400'>No poster available</span>
              </div>
            )}

            {/* Official Trailer Button */}
            {movie.videos?.results && movie.videos.results.length > 0 && (
              <button className='w-60 lg:w-72 bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black font-bold py-2 px-4 transition-colors flex items-center justify-center gap-2'>
                <span>Official Trailer</span>
                <Play size={20} />
              </button>
            )}
          </div>

          {/* Movie Info */}
          <div className='flex-1 text-white min-h-0 overflow-y-auto'>
            {/* Title and Year */}
            <h1 className='text-3xl lg:text-4xl font-bold mb-4'>
              {movie.title} ({releaseYear})
            </h1>

            {/* Release Date and Runtime */}
            {movie.release_date && (
              <div className='mb-16'>
                <div className='flex items-center gap-4'>
                  <span className='text-base lg:text-lg text-gray-300'>
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  {runtime && (
                    <span className='text-base lg:text-lg text-gray-300'>
                      • {runtime}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Rating and Favorite */}
            <div className='relative mb-6'>
              {/* Score y texto juntos a la izquierda */}
              <div className='flex items-center gap-3'>
                <RatingCircle rating={movie.vote_average} size={80} />
                <span className='text-base font-medium text-white'>
                  Users
                  <br />
                  Score
                </span>
              </div>

              {/* Botón de favoritos centrado verticalmente */}
              <div className='absolute top-1/2 right-0 -translate-y-1/2'>
                <FavoriteButton movie={movie} size={28} />
              </div>
            </div>

            {/* Tagline */}
            {movie.tagline && (
              <p className='text-lg italic text-gray-300 mb-4'>
                &quot;{movie.tagline}&quot;
              </p>
            )}

            {/* Overview */}
            <div className='mb-8'>
              <h3 className='text-xl font-bold mb-2'>Overview:</h3>
              <p className='text-base text-gray-200 leading-relaxed max-w-4xl'>
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className='flex flex-wrap gap-4 mb-4'>
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className='w-20 h-8 px-4 py-2 border border-[#F0B90B] text-[#F0B90B] font-medium text-sm rounded-md flex items-center justify-center'
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
