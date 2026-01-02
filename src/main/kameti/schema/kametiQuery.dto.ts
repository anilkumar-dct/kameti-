import { KametiStatus } from '@prisma/client'
import { BaseQuery } from '../../common/interfaces/IQuery'

/**
 * Query DTO for Kameti filtering, pagination, and sorting.
 * Extends BaseQuery with Kameti-specific filters.
 */
export interface KametiQueryDto extends BaseQuery {
  /** Minimum budget amount filter */
  budgetMin?: number
  /** Maximum budget amount filter */
  budgetMax?: number
  /** Minimum installment amount filter */
  installmentMin?: number
  /** Maximum installment amount filter */
  installmentMax?: number
  /** Minimum duration in months filter */
  monthsMin?: number
  /** Maximum duration in months filter */
  monthsMax?: number
  /** Filter by status (can select multiple) */
  status?: KametiStatus[]
}
