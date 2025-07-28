'use client';

import React, { createContext, useContext } from 'react';
import { useSidebarState } from '@/hooks';

interface SidebarContextType {
  searchQuery: string;
  selectedGenreId: number | null;
  handleSearchChange: (query: string) => void;
  handleGenreChange: (genreId: number | null) => void;
  clearFilters: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const sidebarState = useSidebarState();

  return (
    <SidebarContext.Provider value={sidebarState}>
      {children}
    </SidebarContext.Provider>
  );
};
