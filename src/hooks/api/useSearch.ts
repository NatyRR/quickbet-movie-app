import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { searchService, SearchFilters } from '@/services';
import { Movie, SearchMultiResult } from '@/types/movie';
import { TMDBPaginatedResponse } from '@/types/api';

export const SEARCH_QUERY_KEYS = {
  all: ['search'] as const,
  movies: (query: string, page: number, filters?: SearchFilters) =>
    [...SEARCH_QUERY_KEYS.all, 'movies', query, page, filters] as const,
  multi: (query: string, page: number, includeAdult: boolean) =>
    [...SEARCH_QUERY_KEYS.all, 'multi', query, page, includeAdult] as const,
  person: (query: string, page: number) =>
    [...SEARCH_QUERY_KEYS.all, 'person', query, page] as const,
  collection: (query: string, page: number) =>
    [...SEARCH_QUERY_KEYS.all, 'collection', query, page] as const,
  company: (query: string, page: number) =>
    [...SEARCH_QUERY_KEYS.all, 'company', query, page] as const,
  keyword: (query: string, page: number) =>
    [...SEARCH_QUERY_KEYS.all, 'keyword', query, page] as const,
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useMovieSearch = (
  query: string,
  page: number = 1,
  filters?: SearchFilters
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<Movie>>, Error> & {
  debouncedQuery: string;
} => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  const queryResult = useQuery({
    queryKey: SEARCH_QUERY_KEYS.movies(debouncedQuery, page, filters),
    queryFn: () => searchService.searchMovies(debouncedQuery, page, filters),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    ...queryResult,
    debouncedQuery,
  };
};

export const useMultiSearch = (
  query: string,
  page: number = 1,
  includeAdult: boolean = false
): UseQueryResult<
  AxiosResponse<TMDBPaginatedResponse<SearchMultiResult>>,
  Error
> & {
  debouncedQuery: string;
} => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  const queryResult = useQuery({
    queryKey: SEARCH_QUERY_KEYS.multi(debouncedQuery, page, includeAdult),
    queryFn: () =>
      searchService.searchMulti(debouncedQuery, page, includeAdult),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    ...queryResult,
    debouncedQuery,
  };
};

export const usePersonSearch = (
  query: string,
  page: number = 1,
  includeAdult: boolean = false
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<unknown>>, Error> => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  return useQuery({
    queryKey: SEARCH_QUERY_KEYS.person(debouncedQuery, page),
    queryFn: () =>
      searchService.searchPerson(debouncedQuery, page, includeAdult),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useCollectionSearch = (
  query: string,
  page: number = 1
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<unknown>>, Error> => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  return useQuery({
    queryKey: SEARCH_QUERY_KEYS.collection(debouncedQuery, page),
    queryFn: () => searchService.searchCollection(debouncedQuery, page),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useCompanySearch = (
  query: string,
  page: number = 1
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<unknown>>, Error> => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  return useQuery({
    queryKey: SEARCH_QUERY_KEYS.company(debouncedQuery, page),
    queryFn: () => searchService.searchCompany(debouncedQuery, page),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 15, // 15 minutes (companies don't change often)
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useKeywordSearch = (
  query: string,
  page: number = 1
): UseQueryResult<AxiosResponse<TMDBPaginatedResponse<unknown>>, Error> => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  return useQuery({
    queryKey: SEARCH_QUERY_KEYS.keyword(debouncedQuery, page),
    queryFn: () => searchService.searchKeyword(debouncedQuery, page),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 30, // 30 minutes (keywords are quite stable)
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useSearchSuggestions = (query: string, maxResults: number = 5) => {
  const { data: searchResults, isLoading, error } = useMovieSearch(query);

  const suggestions = useMemo(() => {
    if (!searchResults?.data?.results) return [];

    return searchResults.data.results.slice(0, maxResults).map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : null,
      poster_path: movie.poster_path,
    }));
  }, [searchResults, maxResults]);

  return {
    suggestions,
    isLoading,
    error,
    hasResults: suggestions.length > 0,
  };
};

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('quickbet_search_history');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  }, []);

  const addToHistory = (query: string) => {
    if (!query.trim() || query.length < 2) return;

    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item !== query);
      const newHistory = [query, ...filtered].slice(0, 10); // Keep only last 10 searches

      try {
        localStorage.setItem(
          'quickbet_search_history',
          JSON.stringify(newHistory)
        );
      } catch (error) {
        console.error('Error saving search history:', error);
      }

      return newHistory;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem('quickbet_search_history');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const removeFromHistory = (query: string) => {
    setSearchHistory((prev) => {
      const newHistory = prev.filter((item) => item !== query);

      try {
        localStorage.setItem(
          'quickbet_search_history',
          JSON.stringify(newHistory)
        );
      } catch (error) {
        console.error('Error updating search history:', error);
      }

      return newHistory;
    });
  };

  return {
    searchHistory,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
};
