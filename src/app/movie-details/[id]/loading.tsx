export default function Loading() {
  return (
    <div className='min-h-screen bg-black lg:h-screen lg:flex lg:flex-col'>
      {/* Hero Section Skeleton */}
      <div className='lg:flex-[0.6] lg:overflow-hidden'>
        <div className='relative min-h-[60vh] lg:h-full'>
          {/* Background skeleton */}
          <div className='absolute inset-0 bg-gray-800 animate-pulse' />

          {/* Back button skeleton */}
          <div className='absolute top-6 left-6 z-20'>
            <div className='w-10 h-10 bg-gray-700 rounded-full animate-pulse' />
          </div>

          {/* Content skeleton */}
          <div className='absolute bottom-0 left-0 right-0 p-6 lg:p-12 z-10'>
            <div className='flex flex-col lg:flex-row gap-6'>
              {/* Poster skeleton */}
              <div className='w-48 h-72 bg-gray-700 rounded-lg animate-pulse flex-shrink-0' />

              {/* Info skeleton */}
              <div className='flex-1 space-y-4'>
                {/* Title */}
                <div className='h-8 bg-gray-700 rounded animate-pulse w-3/4' />

                {/* Year and runtime */}
                <div className='flex gap-4'>
                  <div className='h-4 bg-gray-700 rounded animate-pulse w-16' />
                  <div className='h-4 bg-gray-700 rounded animate-pulse w-20' />
                </div>

                {/* Genres */}
                <div className='flex gap-2'>
                  <div className='h-6 bg-gray-700 rounded-full animate-pulse w-16' />
                  <div className='h-6 bg-gray-700 rounded-full animate-pulse w-20' />
                  <div className='h-6 bg-gray-700 rounded-full animate-pulse w-18' />
                </div>

                {/* Rating and buttons */}
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 bg-gray-700 rounded-full animate-pulse' />
                  <div className='h-10 bg-gray-700 rounded animate-pulse w-32' />
                  <div className='w-10 h-10 bg-gray-700 rounded-full animate-pulse' />
                </div>

                {/* Overview */}
                <div className='space-y-2'>
                  <div className='h-4 bg-gray-700 rounded animate-pulse w-full' />
                  <div className='h-4 bg-gray-700 rounded animate-pulse w-5/6' />
                  <div className='h-4 bg-gray-700 rounded animate-pulse w-4/6' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section Skeleton */}
      <div className='lg:flex-[0.4] lg:overflow-hidden bg-gray-900 p-6'>
        <div className='space-y-4'>
          {/* Section title */}
          <div className='h-6 bg-gray-700 rounded animate-pulse w-48' />

          {/* Movies grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {Array.from({ length: 8 }).map((_, index) => (
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
