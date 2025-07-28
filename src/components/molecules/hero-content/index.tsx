import React from 'react';

interface HeroContentProps {
  title: string;
  overview: string;
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  title,
  overview,
  className = '',
}) => {
  // Función para truncar el overview si es muy largo
  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Título de la película */}
      <h1
        className='
        text-[35px]
        leading-[39px]
        font-bold 
        text-white 
        drop-shadow-lg
        font-sans
      '
      >
        {title}
      </h1>

      {/* Descripción de la película */}
      <p
        className='
        text-[20px]
        leading-[24px]
        font-bold
        text-gray-200 
        max-w-2xl
        drop-shadow-md
        font-sans
      '
      >
        {truncateText(overview)}
      </p>
    </div>
  );
};
