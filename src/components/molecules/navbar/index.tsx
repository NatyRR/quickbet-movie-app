'use client';

import { usePathname } from 'next/navigation';
import { AuthModal } from '@/components/molecules/auth-modal';
import Image from 'next/image';
import { CircleUserRound } from 'lucide-react';
import { FC } from 'react';
import React from 'react';
import { NavigationLink } from '@/components/atoms/navigation-link';

export const Navbar: FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className='
        w-full 
        h-[69px] 
        bg-black 
        flex 
        items-center 
        justify-between 
        px-[100px]
        opacity-100
      '
      style={{ maxWidth: '1440px', margin: '0 auto' }}
    >
      <div className='flex items-center gap-[42px]'>
        <div className='flex-shrink-0'>
          <Image
            src='/assets/Logo.png'
            alt='QuickBet Movies'
            width={164}
            height={42}
            className='object-contain'
            priority
          />
        </div>

        <div className='flex items-center gap-[42px]'>
          <NavigationLink
            href='/'
            label='Popular'
            isActive={pathname === '/' || pathname === '/movie'}
          />
          <NavigationLink
            href='/favorites'
            label='Favorites'
            isActive={pathname === '/favorites'}
          />
        </div>
      </div>
      <div className='flex-shrink-0'>
        <AuthModal>
          <button className='hover:opacity-80 transition-opacity'>
            <CircleUserRound size={30} color='white' />
          </button>
        </AuthModal>
      </div>
    </nav>
  );
};
