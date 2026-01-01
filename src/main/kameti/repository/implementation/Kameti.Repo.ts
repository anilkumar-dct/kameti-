import { Kameti, PrismaClient } from '@prisma/client'
import { KametiCreateDto } from '../../schema/kametiCreate.dto'
import { KametiResponseDto } from '../../schema/kametiRespone.dto'
import { IKametiRepo } from '../interface/IKameti.Repo'
import { KametiUpdateDto } from '../../schema/kametiUpdate.dto'
import { CommonRepo } from '../../../common/CommonRepo/Common.Repo'

/**
 * Prisma-based implementation of the IKametiRepo interface.
 *
 * Inherits `findAll`, `findById`, and `create` from the generic `CommonRepo`.
 * Implements specific logic for `findOne`, `update`, and `delete`.
 */
export class KametiRepo extends CommonRepo<Kameti, KametiCreateDto> implements IKametiRepo {
  /**
   * Initializes the repository with an injected Prisma client.
   * Passes `prisma.kameti` to the generic `CommonRepo` superclass.
   * @param prisma - The singleton instance of PrismaClient.
   */
  constructor(private prisma: PrismaClient) {
    super(prisma.kameti)
  }

  /**
   * Retrieves a single Kameti record by a partial filter object.
   * Useful for finding by non-unique fields like status or title.
   * @param filter - Partial Kameti object (e.g. `{ status: 'ACTIVE' }`).
   */
  async findOne(filter: Partial<Kameti>): Promise<KametiResponseDto | null> {
    return await this.prisma.kameti.findFirst({ where: filter })
  }

  /**
   * Updates an existing Kameti record.
   * @param id - ID of the record to update.
   * @param data - DTO containing the fields to update.
   */
  async update(id: number, data: KametiUpdateDto): Promise<KametiResponseDto> {
    return await this.prisma.kameti.update({ where: { id }, data })
  }

  /**
   * Permanently deletes a Kameti record.
   * @param id - ID of the record to delete.
   */
  async delete(id: number): Promise<KametiResponseDto> {
    return await this.prisma.kameti.delete({ where: { id } })
  }
}
