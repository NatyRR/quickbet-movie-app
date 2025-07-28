import React from 'react';

// components
import Link from 'next/link';

// types
import { FC } from 'react';

interface NavigationLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  className?: string;
}

export const NavigationLink: FC<NavigationLinkProps> = ({
  href,
  label,
  isActive = false,
  className = '',
}) => {
  return (
    <Link
      href={href}
      className={`
        text-white 
        font-medium 
        text-base 
        transition-colors 
        duration-200 
        hover:text-yellow-400
        ${isActive ? 'text-yellow-400' : 'text-white'}
        ${className}
      `}
    >
      {label}
    </Link>
  );
};
