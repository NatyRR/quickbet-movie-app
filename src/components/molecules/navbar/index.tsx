'use client';

import { usePathname } from 'next/navigation';
import { AuthModal } from '@/components/molecules/auth-modal';
import { MobileDrawer } from '@/components/molecules/mobile-drawer';
import { MobileMenuButton } from '@/components/atoms/mobile-menu-button';
import { NavigationLink } from '@/components/atoms/navigation-link';
import { useMobileMenu } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';
import { FC } from 'react';
import React from 'react';

export const Navbar: FC = () => {
  const pathname = usePathname();
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <>
      <nav
        className="
          w-full 
          h-[69px] 
          bg-black 
          flex 
          items-center 
          justify-between 
          px-4 
          sm:px-6 
          md:px-8 
          lg:px-[100px]
          opacity-100
        "
      >
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[42px]">
          <Link 
            href="/" 
            className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/assets/Logo.png"
              alt="QuickBet Movies"
              width={164}
              height={42}
              className="object-contain w-32 h-8 sm:w-36 sm:h-9 md:w-40 md:h-10 lg:w-[164px] lg:h-[42px]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-[42px]">
            <NavigationLink
              href="/"
              label="Popular"
              isActive={pathname === '/' || pathname === '/movie'}
            />
            <NavigationLink
              href="/favorites"
              label="Favorites"
              isActive={pathname === '/favorites'}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Auth Button */}
          <div className="hidden md:block flex-shrink-0">
            <AuthModal>
              <button className="hover:opacity-80 transition-opacity">
                <CircleUserRound size={30} color="white" />
              </button>
            </AuthModal>
          </div>

          {/* Mobile Menu Button */}
          <MobileMenuButton
            isOpen={isOpen}
            onClick={toggleMenu}
          />
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isOpen}
        onClose={closeMenu}
      />
    </>
  );
};
