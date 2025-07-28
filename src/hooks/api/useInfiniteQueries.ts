// mainTools
import { useMemo } from 'react';

// services
import {
  moviesService,
  searchService,
  MovieFilters,
  SearchFilters,
} from '@/services';

// hooks
import { useInfiniteQuery } from '@tanstack/react-query';
import { SEARCH_QUERY_KEYS } from './useSearch';
import { MOVIE_QUERY_KEYS } from './useMovies';
import { useDebounce } from './useSearch';

export const useInfinitePopularMovies = () => {
  const query = useInfiniteQuery({
    queryKey: [...MOVIE_QUERY_KEYS.all, 'infinite', 'popular'],
    queryFn: ({ pageParam = 1 }) => moviesService.getPopular(pageParam),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const allMovies = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.data.results) || [];
  }, [query.data]);

  const hasMorePages = useMemo(() => {
    if (!query.data?.pages.length) return true;
    const lastPage = query.data.pages[query.data.pages.length - 1];
    return lastPage.data.page < lastPage.data.total_pages;
  }, [query.data]);

  return {
    ...query,
    allMovies,
    hasMorePages,
  };
};

export const useInfiniteNowPlayingMovies = (region: string = 'US') => {
  const query = useInfiniteQuery({
    queryKey: [...MOVIE_QUERY_KEYS.all, 'infinite', 'nowPlaying', region],
    queryFn: ({ pageParam = 1 }) =>
      moviesService.getNowPlaying(pageParam, region),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const allMovies = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.data.results) || [];
  }, [query.data]);

  const hasMorePages = useMemo(() => {
    if (!query.data?.pages.length) return true;
    const lastPage = query.data.pages[query.data.pages.length - 1];
    return lastPage.data.page < lastPage.data.total_pages;
  }, [query.data]);

  return {
    ...query,
    allMovies,
    hasMorePages,
  };
};

export const useInfiniteUpcomingMovies = (region: string = 'US') => {
  const query = useInfiniteQuery({
    queryKey: [...MOVIE_QUERY_KEYS.all, 'infinite', 'upcoming', region],
    queryFn: ({ pageParam = 1 }) =>
      moviesService.getUpcoming(pageParam, region),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const allMovies = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.data.results) || [];
  }, [query.data]);

  const hasMorePages = useMemo(() => {
    if (!query.data?.pages.length) return true;
    const lastPage = query.data.pages[query.data.pages.length - 1];
    return lastPage.data.page < lastPage.data.total_pages;
  }, [query.data]);

  return {
    ...query,
    allMovies,
    hasMorePages,
  };
};

export const useInfiniteTopRatedMovies = () => {
  const query = useInfiniteQuery({
    queryKey: [...MOVIE_QUERY_KEYS.all, 'infinite', 'topRated'],
    queryFn: ({ pageParam = 1 }) => moviesService.getTopRated(pageParam),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 90, // 1.5 hours
  });

  const allMovies = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.data.results) || [];
  }, [query.data]);

  const hasMorePages = useMemo(() => {
    if (!query.data?.pages.length) return true;
    const lastPage = query.data.pages[query.data.pages.length - 1];
    return lastPage.data.page < lastPage.data.total_pages;
  }, [query.data]);

  return {
    ...query,
    allMovies,
    hasMorePages,
  };
};

export const useInfiniteMoviesByGenre = (
  genreId: number,
  sortBy: string = 'popularity.desc'
) => {
  const query = useInfiniteQuery({
    queryKey: [...MOVIE_QUERY_KEYS.all, 'infinite', 'byGenre', genreId, sortBy],
    queryFn: ({ pageParam = 1 }) =>
      moviesService.getByGenre(genreId, pageParam, sortBy),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!genreId && genreId > 0,
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const allMovies = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.data.results) || [];
  }, [query.data]);

  const hasMorePages = useMemo(() => {
    if (!query.data?.pages.length) return true;
    const lastPage = query.data.pages[query.data.pages.length - 1];
    return lastPage.data.page < lastPage.data.total_pages;
  }, [query.data]);

  return {
    ...query,
    allMovies,
    hasMorePages,
  };
};

export const useInfiniteDiscoverMovies = (filters?: MovieFilters) => {
  const query = useInfiniteQuery({
    queryKey: [...MOVIE_QUERY_KEYS.all, 'infinite', 'discover', filters],
    queryFn: ({ pageParam = 1 }) =>
      moviesService.discoverMovies({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 20, // 20 minutes
  });

  const allMovies = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.data.results) || [];
  }, [query.data]);

  const hasMorePages = useMemo(() => {
    if (!query.data?.pages.length) return true;
    const lastPage = query.data.pages[query.data.pages.length - 1];
    return lastPage.data.page < lastPage.data.total_pages;
  }, [query.data]);

  return {
    ...query,
    allMovies,
    hasMorePages,
  };
};

export const useInfiniteMovieSearch = (
  query: string,
  filters?: SearchFilters
) => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  const infiniteQuery = useInfiniteQuery({
    queryKey: [
      ...SEARCH_QUERY_KEYS.all,
      'infinite',
      'movies',
      debouncedQuery,
      filters,
    ],
    queryFn: ({ pageParam = 1 }) =>
      searchService.searchMovies(debouncedQuery, pageParam, filters),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  const allMovies = useMemo(() => {
    return infiniteQuery.data?.pages.flatMap((page) => page.data.results) || [];
  }, [infiniteQuery.data]);

  const hasMorePages = useMemo(() => {
    if (!infiniteQuery.data?.pages.length) return true;
    const lastPage =
      infiniteQuery.data.pages[infiniteQuery.data.pages.length - 1];
    return lastPage.data.page < lastPage.data.total_pages;
  }, [infiniteQuery.data]);

  return {
    ...infiniteQuery,
    allMovies,
    hasMorePages,
    debouncedQuery,
  };
};

export const useInfiniteMultiSearch = (
  query: string,
  includeAdult: boolean = false
) => {
  const debouncedQuery = useDebounce(query.trim(), 300);

  const infiniteQuery = useInfiniteQuery({
    queryKey: [
      ...SEARCH_QUERY_KEYS.all,
      'infinite',
      'multi',
      debouncedQuery,
      includeAdult,
    ],
    queryFn: ({ pageParam = 1 }) =>
      searchService.searchMulti(debouncedQuery, pageParam, includeAdult),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.data;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  const allResults = useMemo(() => {
    return infiniteQuery.data?.pages.flatMap((page) => page.data.results) || [];
  }, [infiniteQuery.data]);

  const hasMorePages = useMemo(() => {
    if (!infiniteQuery.data?.pages.length) return true;
    const lastPage =
      infiniteQuery.data.pages[infiniteQuery.data.pages.length - 1];
    return lastPage.data.page < lastPage.data.total_pages;
  }, [infiniteQuery.data]);

  return {
    ...infiniteQuery,
    allResults,
    hasMorePages,
    debouncedQuery,
  };
};
