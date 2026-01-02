/**
 * Pagination metadata for paginated responses
 */
export interface PaginationMeta {
  /** Current page number (1-indexed) */
  page: number
  /** Number of records per page */
  limit: number
  /** Total number of records in the database */
  totalCount: number
  /** Number of records fetched for this page */
  fetchedCount: number
  /** Total number of pages */
  totalPages: number
  /** Whether there is a next page */
  hasNextPage: boolean
  /** Whether there is a previous page */
  hasPreviousPage: boolean
}

/**
 * Generic paginated response wrapper
 */
export interface PaginatedResponse<T> {
  /** Array of data items for the current page */
  data: T[]
  /** Pagination metadata */
  pagination: PaginationMeta
}
