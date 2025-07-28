'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        md:hidden
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-lg
        bg-gray-800
        hover:bg-gray-700
        transition-colors
        duration-200
        ${className}
      `}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {isOpen ? (
        <X size={24} className="text-white" />
      ) : (
        <Menu size={24} className="text-white" />
      )}
    </button>
  );
};