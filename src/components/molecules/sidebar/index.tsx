'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useMovieGenres } from '@/hooks';
import { Genre } from '@/types/movie';
import './sidebar.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SidebarProps {
  searchQuery: string;
  selectedGenreId: number | null;
  onSearchChange: (query: string) => void;
  onGenreChange: (genreId: number | null) => void;
  className?: string;
  isOverlay?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchQuery,
  selectedGenreId,
  onSearchChange,
  onGenreChange,
  className = '',
  isOverlay = false,
  onClose,
}) => {
  const { data: genresData } = useMovieGenres();
  const genres: Genre[] = genresData?.data?.genres || [];

  const handleGenreSelect = (value: string) => {
    const genreId = value === 'all' ? null : parseInt(value);
    onGenreChange(genreId);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div
      className={`
        hidden md:block
        ${isOverlay ? 'w-full' : 'w-[260px] 2xl:w-[320px]'} 
        bg-[#262626] 
        min-h-screen 
        flex-shrink-0 
        ${className}
      `}
    >
      <div className='p-4 sm:p-6 space-y-6 sm:space-y-8'>
        {/* Search Section */}
        <div className='space-y-4'>
          <h2 className='text-white text-xl font-semibold'>Search</h2>

          <div className='flex justify-center'>
            <div className='relative w-full max-w-[228px]'>
              <input
                type='text'
                placeholder='Keywords'
                value={searchQuery}
                onChange={handleSearchInputChange}
                className='
                  w-full
                  h-[46px]
                  bg-[#1C1C1C] 
                  text-white 
                  placeholder-gray-400 
                  px-4 
                  pr-14
                  border-0
                  border-b 
                  border-b-[#717171] 
                  outline-none 
                  focus:ring-0
                  focus:border-b-[#717171]
                  rounded-none
                '
              />
              <Search
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white'
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Genres Section */}
        <div className='space-y-4'>
          <h2 className='text-white text-xl font-semibold'>Genres</h2>

          {/* Genre Select */}
          <div className='flex justify-center'>
            <div className='w-full max-w-[228px]'>
              <Select
                value={selectedGenreId ? selectedGenreId.toString() : 'all'}
                onValueChange={handleGenreSelect}
              >
                <SelectTrigger
                  className='
                    w-full
                    h-[40px]
                    bg-[#1C1C1C] 
                    text-white 
                    border-0 
                    border-b 
                    border-b-[#717171] 
                    hover:bg-[#1C1C1C] 
                    focus:ring-0 
                    focus:border-b-[#717171] 
                    focus-visible:ring-0 
                    focus-visible:outline-none 
                    active:outline-none 
                    rounded-none 
                    px-4
                  '
                >
                  <SelectValue placeholder='Select a genre' />
                </SelectTrigger>
                <SelectContent className='bg-[#1C1C1C] border-gray-600 text-white max-h-80 rounded-none custom-scrollbar overflow-y-auto'>
                  <SelectItem
                    value='all'
                    className='text-white hover:bg-[#717171] focus:bg-[#717171] focus:ring-0 focus-visible:ring-0 focus-visible:outline-none data-[highlighted]:bg-[#717171] data-[state=checked]:bg-[#717171] font-medium cursor-pointer'
                  >
                    All Genres
                  </SelectItem>
                  {genres.map((genre) => (
                    <SelectItem
                      key={genre.id}
                      value={genre.id.toString()}
                      className='text-white hover:bg-[#717171] focus:bg-[#717171] focus:ring-0 focus-visible:ring-0 focus-visible:outline-none data-[highlighted]:bg-[#717171] data-[state=checked]:bg-[#717171] cursor-pointer'
                    >
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
