import { Kameti, PrismaClient } from '@prisma/client'
import { KametiCreateDto } from '../../schema/kametiCreate.dto'
import { IKametiRepo } from '../interface/IKameti.Repo'
import { KametiUpdateDto } from '../../schema/kametiUpdate.dto'
import { CommonRepo } from '../../../common/CommonRepo/Common.Repo'
import { KametiQueryDto } from '../../schema/kametiQuery.dto'
import { QueryBuilder } from '../../../common/utils/QueryBuilder'
import { PaginatedResponse } from '../../../common/interfaces/IPaginatedResponse'

/**
 * Prisma-based implementation of the IKametiRepo interface.
 *
 * Inherits `findById` and `create` from the generic `CommonRepo`.
 * Implements specific logic for `findAll`, `findOne`, `update`, and `delete`.
 */
export class KametiRepo
  extends CommonRepo<Kameti, KametiCreateDto, KametiQueryDto>
  implements IKametiRepo
{
  /**
   * Initializes the repository with an injected Prisma client.
   * Passes `prisma.kameti` to the generic `CommonRepo` superclass.
   * @param prisma - The singleton instance of PrismaClient.
   */
  constructor(private prisma: PrismaClient) {
    super(prisma.kameti)
  }

  /**
   * Retrieves a single record by its ID.
   * Override CommonRepo to return DTO.
   */
  async findById(id: number): Promise<Kameti | null> {
    const result = await this.prisma.kameti.findUnique({ where: { id } })
    return result
  }

  /**
   * Creates a new record in the database.
   * Override CommonRepo to return DTO.
   */
  async create(data: KametiCreateDto): Promise<Kameti> {
    const result = await this.prisma.kameti.create({ data })
    return result
  }

  /**
   * Retrieves all Kameti records with optional filtering, pagination, sorting, and search.
   * Returns paginated response with metadata.
   * @param query - Optional query parameters for filtering.
   * @returns Paginated response with data and pagination metadata.
   */
  async findAll(query?: KametiQueryDto): Promise<PaginatedResponse<Kameti>> {
    // Build pagination arguments
    const pagination = QueryBuilder.getPagination(query)

    // Build sorting arguments
    const sorting = QueryBuilder.getSorting(query)

    // Build search arguments (search in title field)
    const searchArgs = QueryBuilder.getSearch(query, ['title'])

    // Build Kameti-specific filter arguments
    const filterWhere: Record<string, unknown> = {}

    // Budget range filter
    if (query?.budgetMin !== undefined || query?.budgetMax !== undefined) {
      filterWhere.budget = {}
      if (query.budgetMin !== undefined) {
        ;(filterWhere.budget as Record<string, unknown>).gte = query.budgetMin
      }
      if (query.budgetMax !== undefined) {
        ;(filterWhere.budget as Record<string, unknown>).lte = query.budgetMax
      }
    }

    // Installment range filter
    if (query?.installmentMin !== undefined || query?.installmentMax !== undefined) {
      filterWhere.installment = {}
      if (query.installmentMin !== undefined) {
        ;(filterWhere.installment as Record<string, unknown>).gte = query.installmentMin
      }
      if (query.installmentMax !== undefined) {
        ;(filterWhere.installment as Record<string, unknown>).lte = query.installmentMax
      }
    }

    // Months range filter
    if (query?.monthsMin !== undefined || query?.monthsMax !== undefined) {
      filterWhere.months = {}
      if (query.monthsMin !== undefined) {
        ;(filterWhere.months as Record<string, unknown>).gte = query.monthsMin
      }
      if (query.monthsMax !== undefined) {
        ;(filterWhere.months as Record<string, unknown>).lte = query.monthsMax
      }
    }

    // Status filter (array of statuses)
    if (query?.status && query.status.length > 0) {
      filterWhere.status = { in: query.status }
    }

    // Merge all where clauses
    const where = QueryBuilder.mergeWhere(searchArgs.where, filterWhere)

    // Get total count with the same filters (without pagination)
    const totalCount = await this.prisma.kameti.count({ where })

    // Execute query with all filters
    const data = await this.prisma.kameti.findMany({
      ...pagination,
      ...sorting,
      where
    })

    // Calculate pagination metadata
    const page = query?.page ?? 1
    const limit = query?.limit ?? 10
    const fetchedCount = data.length
    const totalPages = Math.ceil(totalCount / limit)

    return {
      data: data,
      pagination: {
        page,
        limit,
        totalCount,
        fetchedCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    }
  }

  /**
   * Retrieves a single Kameti record by a partial filter object.
   * Useful for finding by non-unique fields like status or title.
   * @param filter - Partial Kameti object (e.g. `{ status: 'ACTIVE' }`).
   */
  async findOne(filter: Partial<Kameti>): Promise<Kameti | null> {
    const result = await this.prisma.kameti.findFirst({ where: filter })
    return result
  }

  /**
   * Updates an existing Kameti record.
   * @param id - ID of the record to update.
   * @param data - DTO containing the fields to update.
   */
  async update(id: number, data: KametiUpdateDto): Promise<Kameti> {
    const result = await this.prisma.kameti.update({ where: { id }, data })
    return result
  }

  /**
   * Permanently deletes a Kameti record.
   * @param id - ID of the record to delete.
   */
  async delete(id: number): Promise<Kameti> {
    const result = await this.prisma.kameti.delete({ where: { id } })
    return result
  }
}
