export interface TMDBApiResponse<T = unknown> {
  page?: number;
  results?: T;
  total_pages?: number;
  total_results?: number;
}

export interface TMDBError {
  status_code: number;
  status_message: string;
  success: boolean;
}

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
