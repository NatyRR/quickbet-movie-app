'use client';

// mainTools
import { useState, useEffect } from 'react';

// hooks
export const useSidebarState = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  useEffect(() => {}, [searchQuery, selectedGenreId]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && selectedGenreId) {
      setSelectedGenreId(null);
    }
  };

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenreId(genreId);
    if (genreId && searchQuery.trim()) {
      setSearchQuery('');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenreId(null);
  };

  return {
    searchQuery,
    selectedGenreId,
    handleSearchChange,
    handleGenreChange,
    clearFilters,
  };
};
