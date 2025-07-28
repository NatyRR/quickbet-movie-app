'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { NavigationLink } from '@/components/atoms/navigation-link';
import { AuthModal } from '@/components/molecules/auth-modal';
import { CircleUserRound } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          fixed
          top-0
          right-0
          h-full
          w-64
          bg-black
          shadow-xl
          transform
          transition-transform
          duration-300
          ease-in-out
          z-50
          md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6 space-y-6">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-6">
            <NavigationLink
              href="/"
              label="Popular"
              isActive={pathname === '/' || pathname === '/movie'}
              onClick={onClose}
            />
            <NavigationLink
              href="/favorites"
              label="Favorites"
              isActive={pathname === '/favorites'}
              onClick={onClose}
            />
          </nav>

          {/* Divider */}
          <div className="border-t border-gray-700" />

          {/* User Section */}
          <div className="flex items-center space-x-3">
            <AuthModal>
              <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <CircleUserRound size={24} color="white" />
                <span className="text-white text-sm">Account</span>
              </button>
            </AuthModal>
          </div>
        </div>
      </div>
    </>
  );
};