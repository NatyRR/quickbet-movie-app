'use client';

import React from 'react';

// components
import { HeroBanner } from '@/components/molecules/hero-banner';
import { Sidebar } from '@/components/molecules/sidebar';

// providers
import { SidebarProvider, useSidebarContext } from '@/providers';

interface MainLayoutProps {
  children: React.ReactNode;
  enableSidebarFilters?: boolean;
}

const MainLayoutContent: React.FC<MainLayoutProps> = ({
  children,
  enableSidebarFilters = true,
}) => {
  const {
    searchQuery,
    selectedGenreId,
    handleSearchChange,
    handleGenreChange,
  } = useSidebarContext();

  return (
    <div className='min-h-screen bg-black flex flex-col'>
      <HeroBanner />

      <div className='flex flex-1'>
        <Sidebar
          searchQuery={enableSidebarFilters ? searchQuery : ''}
          selectedGenreId={enableSidebarFilters ? selectedGenreId : null}
          onSearchChange={enableSidebarFilters ? handleSearchChange : () => {}}
          onGenreChange={enableSidebarFilters ? handleGenreChange : () => {}}
        />

        <div className='flex-1 bg-gray-900 min-h-full'>{children}</div>
      </div>
    </div>
  );
};

export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <SidebarProvider>
      <MainLayoutContent {...props} />
    </SidebarProvider>
  );
};
