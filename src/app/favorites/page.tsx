'use client';

import React from 'react';

// hooks
import { useFavorites } from '@/hooks';

// components
import { MainLayout } from '@/components/templates/main-layout';
import { MoviesGrid } from '@/components/organisms/movies-grid';

// types
import { Movie } from '@/types/movie';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const handleMovieClick = (movie: Movie) => {
    console.log('Movie clicked:', movie.title);
  };

  return (
    <MainLayout enableSidebarFilters={false}>
      {favorites.length === 0 ? (
        <div className='p-8 min-h-full' style={{ backgroundColor: '#444444' }}>
          <h2 className='text-white text-2xl font-bold mb-8'>
            Your Favorite Movies
          </h2>
          <div className='text-center text-gray-400 py-12'>
            <p className='text-lg'>No favorite movies yet</p>
            <p className='text-sm mt-2'>
              Start adding movies to your favorites from the Popular section
            </p>
          </div>
        </div>
      ) : (
        <MoviesGrid
          movies={favorites}
          title='Your Favorite Movies'
          isLoading={false}
          error={null}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          onMovieClick={handleMovieClick}
          fullHeight={true}
        />
      )}
    </MainLayout>
  );
}
