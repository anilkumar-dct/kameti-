import { Kameti } from '@prisma/client'
import { KametiCreateDto } from '../../schema/kametiCreate.dto'
import { KametiResponseDto } from '../../schema/kametiRespone.dto'
import { KametiUpdateDto } from '../../schema/kametiUpdate.dto'

/**
 * Interface defining the contract for Kameti data access operations.
 * Decouples the Service layer from the underlying persistence logic.
 */
export interface IKametiRepo {
  /**
   * Retrieves all Kameti records from the database.
   * @returns A promise resolving to an array of KametiResponseDto.
   */
  findAll(): Promise<KametiResponseDto[]>

  /**
   * Finds a specific Kameti record by its unique ID.
   * @param id - The numerical ID of the Kameti.
   * @returns A promise resolving to the record or null if not found.
   */
  findById(id: number): Promise<KametiResponseDto | null>

  /**
   * Finds a specific Kameti record by its unique ID.
   * @param filter - The partial scalar object used for filtering.
   * @returns A promise resolving to the record or null if no match is found.
   */
  findOne(filter: Partial<Kameti>): Promise<KametiResponseDto | null>

  /**
   * Persists a new Kameti record.
   * @param data - The validated creation data.
   * @returns A promise resolving to the newly created record.
   */
  create(data: KametiCreateDto): Promise<KametiResponseDto>

  /**
   * Updates an existing Kameti record.
   * @param id - The ID of the record to update.
   * @param data - The partial data for the update.
   * @returns A promise resolving to the updated record.
   */
  update(id: number, data: KametiUpdateDto): Promise<KametiResponseDto>

  /**
   * Deletes a Kameti record from the database.
   * @param id - The ID of the record to remove.
   * @returns A promise resolving to the deleted record.
   */
  delete(id: number): Promise<KametiResponseDto>
}
