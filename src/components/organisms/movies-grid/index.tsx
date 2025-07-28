'use client';

import React from 'react';

// components
import { MovieCard } from '@/components/molecules/movie-card';

// hooks
import { useResponsiveGrid } from '@/hooks';

// icons
import { ChevronLeft, ChevronRight } from 'lucide-react';

// types
import { Movie } from '@/types/movie';

interface MoviesGridProps {
  movies: Movie[];
  title: string;
  isLoading?: boolean;
  error?: Error | null;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onMovieClick?: (movie: Movie) => void;
  className?: string;
  fullHeight?: boolean;
}

export const MoviesGrid: React.FC<MoviesGridProps> = ({
  movies,
  title,
  isLoading = false,
  error = null,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onMovieClick,
  className = '',
  fullHeight = false,
}) => {
  // Hook para grid responsivo dinámico
  const { containerRef, gridStyle, fallbackClasses } = useResponsiveGrid({
    minCardWidth: 160,
    maxCardWidth: 200,
    gap: 20,
    minColumns: 2,
    maxColumns: 6,
  });
  const handlePrevPage = () => {
    if (onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (onPageChange && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSelect = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const getPaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (error) {
    return (
      <div
        className={`p-8 ${fullHeight ? 'min-h-full' : ''} ${className}`}
        style={{ backgroundColor: '#444444' }}
      >
        <h2 className='text-white text-2xl font-bold mb-8'>{title}</h2>
        <div className='text-center text-red-400 py-12'>
          <p className='text-lg'>Error loading movies</p>
          <p className='text-sm text-gray-400 mt-2'>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-8 ${fullHeight ? 'min-h-full' : ''} ${className}`}
      style={{ backgroundColor: '#444444' }}
    >
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-white text-2xl font-bold'>{title}</h2>

        {totalPages > 1 && (
          <div className='text-gray-400 text-sm'>
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {isLoading && (
        <div 
          className={fallbackClasses}
          style={gridStyle}
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg animate-pulse aspect-[2/3]"
            />
          ))}
        </div>
      )}

      {!isLoading && movies.length > 0 && (
        <div 
          ref={containerRef}
          className={fallbackClasses}
          style={gridStyle}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
              className="h-full"
            />
          ))}
        </div>
      )}

      {!isLoading && movies.length === 0 && (
        <div className='text-center text-gray-400 py-12'>
          <p className='text-lg'>No movies found</p>
          <p className='text-sm mt-2'>Try adjusting your search or filters</p>
        </div>
      )}

      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center mt-8 sm:mt-12 space-x-1 sm:space-x-2 px-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="
              flex 
              items-center 
              px-2
              sm:px-3 
              py-2 
              rounded-lg 
              bg-gray-700 
              text-white 
              hover:bg-gray-600 
              disabled:opacity-50 
              disabled:cursor-not-allowed
              transition-colors
              duration-200
              text-sm
            "
          >
            <ChevronLeft size={16} />
            <span className="ml-1 hidden sm:inline">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1 flex-1 justify-center max-w-xs overflow-x-auto">
            {getPaginationNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-2 sm:px-3 py-2 text-gray-400 text-sm">...</span>
                ) : (
                  <button
                    onClick={() => handlePageSelect(page as number)}
                    className={`
                      px-2
                      sm:px-3 
                      py-2 
                      rounded-lg 
                      transition-colors
                      duration-200
                      text-sm
                      min-w-[32px]
                      ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }
                    `}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="
              flex 
              items-center 
              px-2
              sm:px-3 
              py-2 
              rounded-lg 
              bg-gray-700 
              text-white 
              hover:bg-gray-600 
              disabled:opacity-50 
              disabled:cursor-not-allowed
              transition-colors
              duration-200
              text-sm
            "
          >
            <span className="mr-1 hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
