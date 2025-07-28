import React from 'react';

// services
import { moviesService } from '@/services';

// components
import { MovieDetailsHero } from '@/components/organisms/movie-details-hero';
import { MovieRecommendations } from '@/components/organisms/movie-recommendations';

// types
import { Movie, MovieDetails } from '@/types/movie';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const response = await moviesService.getPopular(1);
    const movies = response.data.results;
    return movies.slice(0, 20).map((movie: Movie) => ({
      id: movie.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function MovieDetailsPage({ params }: PageProps) {
  const { id } = await params;
  let movie: MovieDetails | null = null;

  try {
    const response = await moviesService.getDetails(Number(id));
    movie = response.data;
  } catch (error) {
    console.error('Error al obtener detalles de película:', error);
  }

  if (!movie) {
    return (
      <div className='min-h-screen bg-black flex items-center justify-center'>
        <div className='text-white text-xl'>
          Movie not found. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black lg:h-screen lg:flex lg:flex-col'>
      <div className='lg:flex-[0.6] lg:overflow-hidden'>
        <MovieDetailsHero movie={movie} />
      </div>

      <div className='lg:flex-[0.4] lg:overflow-hidden'>
        <MovieRecommendations
          movieGenres={movie.genres}
          currentMovieId={Number(id)}
          movieTitle={movie.title}
        />
      </div>
    </div>
  );
}
