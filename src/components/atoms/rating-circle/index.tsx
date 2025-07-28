'use client';

import React from 'react';

// mainTools
import { useEffect, useState } from 'react';

// types
import { FC } from 'react';

interface RatingCircleProps {
  rating: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showAnimation?: boolean;
}

export const RatingCircle: FC<RatingCircleProps> = ({
  rating,
  size = 80,
  strokeWidth = 4,
  className = '',
  showAnimation = true,
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  const percentage = Math.min(Math.max(rating * 10, 0), 100);

  const getColor = (perc: number) => {
    return perc >= 50 ? '#4DA14F' : '#FF8800';
  };

  const color = getColor(percentage);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (animatedPercentage / 100) * circumference;
  useEffect(() => {
    if (!showAnimation) {
      setAnimatedPercentage(percentage);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = percentage / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newPercentage = Math.min(increment * currentStep, percentage);
      setAnimatedPercentage(newPercentage);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [percentage, showAnimation]);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className='transform -rotate-90'>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke='rgba(255, 255, 255, 0.1)'
          strokeWidth={strokeWidth}
          fill='transparent'
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill='transparent'
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          className='transition-all duration-300 ease-out'
        />
      </svg>
      <div
        className='absolute inset-0 flex items-center justify-center'
        style={{ fontSize: size * 0.18 }}
      >
        <span className='font-bold text-white'>
          {Math.round(animatedPercentage)}%
        </span>
      </div>
    </div>
  );
};
