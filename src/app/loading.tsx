export default function Loading() {
  return (
    <div className='min-h-screen bg-black'>
      {/* Hero Section Skeleton */}
      <div className='relative min-h-[70vh] lg:h-[80vh]'>
        {/* Background skeleton */}
        <div className='absolute inset-0 bg-gray-800 animate-pulse' />

        {/* Hero Content skeleton */}
        <div className='absolute bottom-0 left-0 right-0 p-6 lg:p-12 z-10'>
          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Poster skeleton */}
            <div className='w-48 h-72 bg-gray-700 rounded-lg animate-pulse flex-shrink-0' />

            {/* Info skeleton */}
            <div className='flex-1 space-y-4'>
              {/* Title */}
              <div className='h-10 bg-gray-700 rounded animate-pulse w-3/4 lg:w-1/2' />

              {/* Año y duración */}
              <div className='flex gap-4'>
                <div className='h-4 bg-gray-700 rounded animate-pulse w-16' />
                <div className='h-4 bg-gray-700 rounded animate-pulse w-20' />
              </div>

              {/* Géneros */}
              <div className='flex gap-2'>
                <div className='h-6 bg-gray-700 rounded-full animate-pulse w-16' />
                <div className='h-6 bg-gray-700 rounded-full animate-pulse w-20' />
                <div className='h-6 bg-gray-700 rounded-full animate-pulse w-18' />
              </div>

              {/* Calificación y botones */}
              <div className='flex items-center gap-4'>
                <div className='w-16 h-16 bg-gray-700 rounded-full animate-pulse' />
                <div className='h-10 bg-gray-700 rounded animate-pulse w-32' />
                <div className='w-10 h-10 bg-gray-700 rounded-full animate-pulse' />
              </div>

              {/* Descripción */}
              <div className='space-y-2'>
                <div className='h-4 bg-gray-700 rounded animate-pulse w-full' />
                <div className='h-4 bg-gray-700 rounded animate-pulse w-5/6' />
                <div className='h-4 bg-gray-700 rounded animate-pulse w-4/6' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Películas Populares Skeleton */}
      <div className='bg-gray-900 p-6 lg:p-12'>
        <div className='space-y-6'>
          {/* Título de sección */}
          <div className='h-8 bg-gray-700 rounded animate-pulse w-64' />

          {/* Grid de películas */}
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className='space-y-2'>
                <div className='aspect-[2/3] bg-gray-700 rounded-lg animate-pulse' />
                <div className='h-4 bg-gray-700 rounded animate-pulse w-3/4' />
                <div className='h-3 bg-gray-700 rounded animate-pulse w-1/2' />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección En Cartelera Skeleton */}
      <div className='bg-black p-6 lg:p-12'>
        <div className='space-y-6'>
          {/* Título de sección */}
          <div className='h-8 bg-gray-700 rounded animate-pulse w-56' />

          {/* Grid de películas */}
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className='space-y-2'>
                <div className='aspect-[2/3] bg-gray-700 rounded-lg animate-pulse' />
                <div className='h-4 bg-gray-700 rounded animate-pulse w-3/4' />
                <div className='h-3 bg-gray-700 rounded animate-pulse w-1/2' />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección Próximos Estrenos Skeleton */}
      <div className='bg-gray-900 p-6 lg:p-12'>
        <div className='space-y-6'>
          {/* Título de sección */}
          <div className='h-8 bg-gray-700 rounded animate-pulse w-60' />

          {/* Grid de películas */}
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className='space-y-2'>
                <div className='aspect-[2/3] bg-gray-700 rounded-lg animate-pulse' />
                <div className='h-4 bg-gray-700 rounded animate-pulse w-3/4' />
                <div className='h-3 bg-gray-700 rounded animate-pulse w-1/2' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
