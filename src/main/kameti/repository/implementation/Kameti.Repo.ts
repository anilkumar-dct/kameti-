import { Kameti, PrismaClient } from '@prisma/client'
import { KametiCreateDto } from '../../schema/kametiCreate.dto'
import { KametiResponseDto } from '../../schema/kametiRespone.dto'
import { IKametiRepo } from '../interface/IKameti.Repo'
import { KametiUpdateDto } from '../../schema/kametiUpdate.dto'

/**
 * Prisma-based implementation of the IKametiRepo interface.
 * Handles direct interaction with the database using Prisma Client.
 */
export class KametiRepo implements IKametiRepo {
  /**
   * Initializes the repository with an injected Prisma client.
   * @param prisma - The singleton instance of PrismaClient.
   */
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches all Kameti records from the database using Prisma.
   * Includes all records without any filters.
   *
   * @returns A promise resolving to an array of KametiResponseDto.
   */
  async findAll(): Promise<KametiResponseDto[]> {
    return await this.prisma.kameti.findMany()
  }

  /**
   * Retrieves a single Kameti record by its primary key ID.
   *
   * @param id - The numerical ID of the Kameti.
   * @returns A promise resolving to the record or null if no match is found.
   */
  async findById(id: number): Promise<KametiResponseDto | null> {
    return await this.prisma.kameti.findUnique({ where: { id } })
  }

  /**
   * Retrieves a single Kameti record by its primary key ID.
   *
   * @param filter - The partial scalar object used for filtering.
   * @returns A promise resolving to the record or null if no match is found.
   */
  async findOne(filter: Partial<Kameti>): Promise<KametiResponseDto | null> {
    return await this.prisma.kameti.findFirst({ where: filter })
  }

  /**
   * Creates a new Kameti entry in the database.
   *
   * @param data - The validated data structure for creation.
   * @returns A promise resolving to the physical record created in the database.
   */
  async create(data: KametiCreateDto): Promise<KametiResponseDto> {
    return await this.prisma.kameti.create({ data })
  }

  /**
   * Updates an existing Kameti record identified by ID.
   * Performs a partial update based on the fields provided in the data object.
   *
   * @param id - The ID of the record to update.
   * @param data - The fields and values to be updated.
   * @returns A promise resolving to the updated record.
   */
  async update(id: number, data: KametiUpdateDto): Promise<KametiResponseDto> {
    return await this.prisma.kameti.update({ where: { id }, data })
  }

  /**
   * Permanently removes a Kameti record from the database.
   *
   * @param id - The ID of the record to delete.
   * @returns A promise resolving to the deleted record data.
   */
  async delete(id: number): Promise<KametiResponseDto> {
    return await this.prisma.kameti.delete({ where: { id } })
  }
}
