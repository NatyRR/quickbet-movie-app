'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// hooks
import { useMoviesByGenre } from '@/hooks';

// components
import { RecommendationCard } from '@/components/molecules/recommendation-card';

// types
import { Movie, Genre } from '@/types/movie';

interface MovieRecommendationsProps {
  movieGenres: Genre[];
  currentMovieId: number;
  movieTitle: string;
}

export const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({
  movieGenres,
  currentMovieId,
}) => {
  const router = useRouter();
  
  // Usar el primer género de la película para obtener recomendaciones
  const primaryGenreId = movieGenres[0]?.id;

  const { data: genreMoviesData, isLoading } = useMoviesByGenre(
    primaryGenreId || 0,
    1
  );

  // Filtrar la película actual de las recomendaciones
  const recommendations =
    genreMoviesData?.data?.results?.filter(
      (movie) => movie.id !== currentMovieId
    ) || [];
  if (isLoading) {
    return (
      <div
        className='py-4 lg:py-6 h-full'
        style={{ backgroundColor: '#444444' }}
      >
        <div className='container mx-auto px-4 h-full flex flex-col'>
          <h2 className='text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 flex-shrink-0'>
            Recommendations
          </h2>
          <div className='text-white text-center flex-1 flex items-center justify-center'>
            Loading recommendations...
          </div>
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div
        className='py-4 lg:py-6 h-full'
        style={{ backgroundColor: '#444444' }}
      >
        <div className='container mx-auto px-4 h-full flex flex-col'>
          <h2 className='text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 flex-shrink-0'>
            Recommendations
          </h2>
          <div className='text-gray-400 text-center flex-1 flex items-center justify-center text-lg'>
            No similar movies available.
          </div>
        </div>
      </div>
    );
  }

  const handleMovieClick = (movie: Movie) => {
    router.push(`/movie-details/${movie.id}`);
  };

  return (
    <div className='py-4 lg:py-6 h-full' style={{ backgroundColor: '#444444' }}>
      <div className='container mx-auto px-4 h-full flex flex-col'>
        <h2
          className='text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6 flex-shrink-0'
          style={{ marginLeft: '0' }}
        >
          Recommendations
        </h2>

        <div className="grid grid-cols-2 gap-3 md:flex md:gap-4 md:justify-start flex-1 md:items-center">
          {recommendations.slice(0, 6).map((movie) => (
            <RecommendationCard
              key={movie.id}
              movie={movie}
              onClick={handleMovieClick}
              className="flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
