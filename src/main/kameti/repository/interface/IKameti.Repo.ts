import { Kameti } from '@prisma/client'
import { KametiCreateDto } from '../../schema/kametiCreate.dto'
import { KametiUpdateDto } from '../../schema/kametiUpdate.dto'
import { ICommonRepo } from '../../../common/interfaces/ICommon.Repo'
import { KametiQueryDto } from '../../schema/kametiQuery.dto'
import { PaginatedResponse } from '../../../common/interfaces/IPaginatedResponse'

/**
 * Interface defining the contract for Kameti data access operations.
 *
 * Extends `ICommonRepo` to inherit standard Read/Create operations,
 * and adds specific methods for Finding by filter, Updating, and Deleting
 * which require specific Kameti logic/types.
 */
export interface IKametiRepo extends ICommonRepo<Kameti, KametiCreateDto> {
  findAll(query?: KametiQueryDto): Promise<PaginatedResponse<Kameti>>
  /** Finds a single record matching specific scalar filters (e.g. status, title). */
  findOne(filter: Partial<Kameti>): Promise<Kameti | null>
  /** Updates an existing Kameti record. */
  update(id: number, data: KametiUpdateDto): Promise<Kameti>
  /** Deletes a Kameti record. */
  delete(id: number): Promise<Kameti>
}
