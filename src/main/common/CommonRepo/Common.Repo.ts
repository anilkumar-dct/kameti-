import { ICommonRepo } from '../interfaces/ICommon.Repo'
import { PrismaDelegate } from '../interfaces/IPrismaDelegate'
import { PaginatedResponse } from '../interfaces/IPaginatedResponse'

/**
 * Abstract Base Repository Class.
 *
 * Implements the standard `ICommonRepo` methods (`findAll`, `findById`, `create`) using a generic Prisma Delegate.
 * Specific repositories (like `KametiRepo`) extend this class to inherit basic functionality
 * and only need to implement their specific complex queries (like `findOne`, `update`, `delete`).
 *
 * @template T - The Prisma Model type.
 * @template CreateDto - The DTO type for creation.
 * @template QueryDto - The DTO type for querying/filtering. Defaults to void.
 */
export abstract class CommonRepo<T, CreateDto, QueryDto = void> implements ICommonRepo<
  T,
  CreateDto,
  QueryDto
> {
  /**
   * @param model - The specific Prisma Delegate (e.g., `prisma.kameti`) injected by the child class.
   */
  constructor(protected model: PrismaDelegate<T, CreateDto>) {}

  /**
   * Retrieves all records from the database table.
   * Base implementation returns all records with basic pagination metadata.
   * Child classes should override this method to apply specific filtering logic using QueryDto.
   * @param query - Optional query parameters for filtering, pagination, and sorting.
   */
  async findAll(query?: QueryDto): Promise<PaginatedResponse<T>> {
    if (!query) {
      const data = await this.model.findMany()
      return {
        data,
        pagination: {
          page: 1,
          limit: data.length,
          totalCount: data.length,
          fetchedCount: data.length,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      }
    }
    // If query is provided but child class doesn't override, return all with basic pagination
    const data = await this.model.findMany()
    return {
      data,
      pagination: {
        page: 1,
        limit: data.length,
        totalCount: data.length,
        fetchedCount: data.length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false
      }
    }
  }

  /**
   * Retrieves a single record by its ID.
   * @param id - The unique ID of the record
   */
  async findById(id: number): Promise<T | null> {
    return await this.model.findUnique({ where: { id } })
  }

  /**
   * Creates a new record in the database.
   * @param data - The data payload for the new record.
   */
  async create(data: CreateDto): Promise<T> {
    return await this.model.create({ data })
  }
}
