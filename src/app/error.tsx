'use client';

import { useEffect } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Home page error:', error);
  }, [error]);

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className='text-center space-y-6 max-w-md mx-auto px-6'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold text-white'>Error al Cargar</h1>
          <h2 className='text-xl text-gray-300'>
            No pudimos cargar las películas
          </h2>
        </div>

        <div className='text-gray-400 text-sm'>
          <p>
            Hubo un problema al cargar el contenido. Por favor, intenta
            nuevamente.
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
            Intentar de nuevo
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
            Volver atrás
          </button>

          <button
            onClick={() => window.location.reload()}
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
            Recargar página
          </button>
        </div>
      </div>
    </div>
  );
}
