'use client';

import { useEffect } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Movie details error:', error);
  }, [error]);

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className='text-center space-y-6 max-w-md mx-auto px-6'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold text-white'>Movie Not Found</h1>
          <h2 className='text-xl text-gray-300'>
            We couldn&apos;t load this movie
          </h2>
        </div>

        <div className='text-gray-400 text-sm'>
          <p>
            The movie you&apos;re looking for might not exist or there was an
            error loading it.
          </p>
          {error.message && (
            <p className='mt-2 font-mono text-xs text-red-400'>
              {error.message}
            </p>
          )}
        </div>

        <div className='space-y-3'>
          <button
            onClick={reset}
            className='
              w-full 
              flex
              items-center
              justify-center
              gap-2
              px-6 
              py-3 
              bg-blue-600 
              hover:bg-blue-700 
              text-white 
              rounded-lg 
              font-medium 
              transition-colors 
              duration-200
            '
          >
            <RefreshCw size={16} />
            Try again
          </button>

          <button
            onClick={() => window.history.back()}
            className='
              w-full 
              flex
              items-center
              justify-center
              gap-2
              px-6 
              py-3 
              bg-gray-700 
              hover:bg-gray-600 
              text-gray-300 
              rounded-lg 
              font-medium 
              transition-colors 
              duration-200
            '
          >
            <ArrowLeft size={16} />
            Go back
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className='
              w-full 
              px-6 
              py-3 
              bg-gray-800 
              hover:bg-gray-700 
              text-gray-400 
              rounded-lg 
              font-medium 
              transition-colors 
              duration-200
            '
          >
            Back to movies
          </button>
        </div>
      </div>
    </div>
  );
}
