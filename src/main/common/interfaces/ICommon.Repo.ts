import { PaginatedResponse } from './IPaginatedResponse'

/**
 * Generic Interface defining the standard Read and Create operations shared across all modules.
 *
 * This interface allows services to depend on a standard contract rather than concrete implementations.
 * Note: Update and Delete are often module-specific and are thus left to individual repository interfaces
 * to implement as needed, or can be added here if fully standardized.
 *
 * @template T - The Domain Entity / Prisma Model type.
 * @template CreateDto - The DTO used for creation.
 * @template QueryDto - The DTO used for querying/filtering. Defaults to void if not specified.
 */
export interface ICommonRepo<T, CreateDto, QueryDto = void> {
  /** Retrieves all records, optionally filtered by query parameters. Returns paginated response. */
  findAll(query?: QueryDto): Promise<PaginatedResponse<T>>
  /** Retrieves a record by its numerical ID. */
  findById(id: number): Promise<T | null>
  /** Creates a new record. */
  create(data: CreateDto): Promise<T>
}
