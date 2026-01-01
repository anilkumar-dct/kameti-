import { ICommonRepo } from './ICommon.Repo'
import { PrismaDelegate } from './IPrismaDelegate'

/**
 * Abstract Base Repository Class.
 *
 * Implements the standard `ICommonRepo` methods (`findAll`, `findById`, `create`) using a generic Prisma Delegate.
 * Specific repositories (like `KametiRepo`) extend this class to inherit basic functionality
 * and only need to implement their specific complex queries (like `findOne`, `update`, `delete`).
 *
 * @template T - The Prisma Model type.
 * @template CreateDto - The DTO type for creation.
 */
export abstract class CommonRepo<T, CreateDto> implements ICommonRepo<T, CreateDto> {
  /**
   * @param model - The specific Prisma Delegate (e.g., `prisma.kameti`) injected by the child class.
   */
  constructor(protected model: PrismaDelegate<T, CreateDto>) {}

  /**
   * Retrieves all records from the database table.
   */
  async findAll(): Promise<T[]> {
    return await this.model.findMany()
  }

  /**
   * Retrieves a single record by its ID.
   * @param id - The unique ID of the record.
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
