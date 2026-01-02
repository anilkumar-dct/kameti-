import { BaseQuery } from '../interfaces/IQuery'

/**
 * Pagination result from BaseQuery
 */
interface PaginationArgs {
  skip: number
  take: number
}

/**
 * Sorting result from BaseQuery
 */
interface SortingArgs {
  orderBy?: Record<string, 'asc' | 'desc'>
}

/**
 * Search result from BaseQuery
 */
interface SearchArgs {
  where?: {
    OR?: Array<Record<string, { contains: string; mode?: string }>>
  }
}

/**
 * QueryBuilder utility class to convert BaseQuery to Prisma arguments.
 */
export class QueryBuilder {
  /**
   * Converts pagination parameters to Prisma skip/take format.
   * @param query - BaseQuery containing page and limit
   * @returns Prisma pagination arguments
   */
  static getPagination(query?: BaseQuery): PaginationArgs {
    const page = query?.page ?? 1
    const limit = query?.limit ?? 10
    const skip = (page - 1) * limit

    return { skip, take: limit }
  }

  /**
   * Converts sorting parameters to Prisma orderBy format.
   * @param query - BaseQuery containing sortBy and sortOrder
   * @returns Prisma sorting arguments
   */
  static getSorting(query?: BaseQuery): SortingArgs {
    if (!query?.sortBy) {
      return {}
    }

    return {
      orderBy: {
        [query.sortBy]: query.sortOrder ?? 'asc'
      }
    }
  }

  /**
   * Converts search parameter to Prisma where clause with OR conditions.
   * @param query - BaseQuery containing search term
   * @param fields - Array of field names to search in
   * @returns Prisma search arguments
   */
  static getSearch(query?: BaseQuery, fields: string[] = []): SearchArgs {
    if (!query?.search || fields.length === 0) {
      return {}
    }

    const searchTerm = query.search

    return {
      where: {
        OR: fields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }))
      }
    }
  }

  /**
   * Merges multiple where clauses into a single where object.
   * @param whereClauses - Array of where clause objects
   * @returns Combined where clause
   */
  static mergeWhere(
    ...whereClauses: Array<Record<string, unknown> | undefined>
  ): Record<string, unknown> {
    const validClauses = whereClauses.filter((clause) => clause && Object.keys(clause).length > 0)

    if (validClauses.length === 0) {
      return {}
    }

    if (validClauses.length === 1) {
      return validClauses[0]!
    }

    // Merge all clauses using AND
    return {
      AND: validClauses
    }
  }
}
