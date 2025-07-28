'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useMovieGenres } from '@/hooks';
import { Genre } from '@/types/movie';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FiltersBarProps {
  searchQuery: string;
  selectedGenreId: number | null;
  onSearchChange: (query: string) => void;
  onGenreChange: (genreId: number | null) => void;
  className?: string;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchQuery,
  selectedGenreId,
  onSearchChange,
  onGenreChange,
  className = '',
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
        block md:hidden 
        w-full 
        bg-[#262626] 
        px-4 
        py-4 
        space-y-4 
        sm:space-y-0 
        sm:flex 
        sm:items-center 
        sm:gap-6
        ${className}
      `}
    >
      {/* Search Input */}
      <div className='flex-1 sm:max-w-xs'>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search keywords'
            value={searchQuery}
            onChange={handleSearchInputChange}
            className='
              w-full
              h-[46px]
              bg-[#1C1C1C] 
              text-white 
              placeholder-gray-400 
              px-4 
              pr-12
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

      {/* Genre Select */}
      <div className='flex-1 sm:max-w-xs'>
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
          <SelectContent className='bg-[#1C1C1C] border-gray-600 text-white max-h-80 rounded-none overflow-y-auto'>
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
  );
};
