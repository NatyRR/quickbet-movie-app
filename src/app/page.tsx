// mainTools
import React from 'react';

// services
import { moviesService } from '@/services';

// components
import { MainLayout } from '@/components/templates/main-layout';
import { HomePageClient } from '@/components/organisms/home-page-client';

// types
import { TMDBPaginatedResponse } from '@/types/api';
import { Movie } from '@/types/movie';

export default async function HomePage() {
  let initialPopularMovies: TMDBPaginatedResponse<Movie> | undefined;

  try {
    const response = await moviesService.getPopular(1);
    initialPopularMovies = response.data;
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
  }

  return (
    <MainLayout>
      <HomePageClient initialPopularMovies={initialPopularMovies} />
    </MainLayout>
  );
}
