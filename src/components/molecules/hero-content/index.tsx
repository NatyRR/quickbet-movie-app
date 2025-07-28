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
        className="
        text-[24px] sm:text-[28px] md:text-[35px]
        leading-[28px] sm:leading-[32px] md:leading-[39px]
        font-bold 
        text-white 
        drop-shadow-lg
        font-sans
      "
      >
        {title}
      </h1>

      {/* Descripción de la película */}
      <p
        className="
        text-[14px] sm:text-[16px] md:text-[20px]
        leading-[18px] sm:leading-[20px] md:leading-[24px]
        font-normal sm:font-medium md:font-bold
        text-gray-200 
        max-w-2xl
        drop-shadow-md
        font-sans
      "
      >
        {truncateText(overview)}
      </p>
    </div>
  );
};
