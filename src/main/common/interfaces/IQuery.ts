/**
 * Base Query Interface for common filtering, pagination, and sorting.
 * Can be extended by specific modules to add custom filters.
 *
 * Defaults (applied by QueryBuilder): page=1, limit=10, sortOrder='asc'
 */
export interface BaseQuery {
  /** Page number (1-indexed). @default 1 */
  page?: number
  /** Records per page. @default 10 */
  limit?: number
  /** Field to sort by */
  sortBy?: string
  /** Sort direction. @default 'asc' */
  sortOrder?: 'asc' | 'desc'
  /** Search term for text filtering */
  search?: string
}
