export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  recommendations?: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
  similar?: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface CastMember {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface GenreList {
  genres: Genre[];
}

export interface TMDBApiListResponse<T> {
  results: T[];
}

export interface TMDBCreditsResponse {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface TMDBVideosResponse {
  results: Video[];
}

export interface SearchMultiResult {
  adult?: boolean;
  backdrop_path?: string | null;
  id: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string | null;
  media_type: 'movie' | 'tv' | 'person';
  genre_ids?: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  gender?: number;
  known_for_department?: string;
  profile_path?: string | null;
  known_for?: Array<Movie>;
}
