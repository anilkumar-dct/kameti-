import { Kameti, Prisma } from '@prisma/client'
import { ApiResponse } from '../../common/ApiResponse/IApiResponse'
import { ResponseFactory } from '../../common/ApiResponse/Response.Factory'
import { IKametiRepo } from '../repository/interface/IKameti.Repo'
import { kametiCreateDto, KametiCreateDto } from '../schema/kametiCreate.dto'
import { KametiResponseDto } from '../schema/kametiRespone.dto'
import { kametiUpdateDto, KametiUpdateDto } from '../schema/kametiUpdate.dto'

/**
 * Service class handling the business logic for Kameti operations.
 * Acts as a bridge between IPC handlers and the Data Access Layer (Repository).
 * Standardizes outputs into ApiResponse objects.
 */
export class KametiService {
  /**
   * Initializes the service with an injected repository.
   * @param kametiRepo - An implementation of the IKametiRepo interface.
   */
  constructor(private kametiRepo: IKametiRepo) {}

  /**
   * Fetches all Kameti records with standardized response formatting.
   * @returns A promise resolving to a success or error ApiResponse.
   */
  async findAll(): Promise<ApiResponse<KametiResponseDto[]>> {
    try {
      const kameti = await this.kametiRepo.findAll()
      return ResponseFactory.success(kameti, 'OK', 'Kameti Fetched Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  /**
   * Fetches a specific Kameti by ID with validation and error handling.
   * @param id - The ID of the Kameti to find.
   * @returns A promise resolving to an ApiResponse with the record or an error.
   */
  async findById(id: number): Promise<ApiResponse<KametiResponseDto | null>> {
    try {
      if (!id || id <= 0) {
        return ResponseFactory.error('Invalid ID provided', 'BAD_REQUEST', 'Validation failed')
      }
      const kameti = await this.kametiRepo.findById(id)
      if (!kameti) {
        return ResponseFactory.error(
          'Kameti not found with id: ' + id,
          'NOT_FOUND',
          'Record not found'
        )
      }
      return ResponseFactory.success(kameti, 'OK', 'Kameti Fetched Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  async findOne(filter: Partial<Kameti>): Promise<ApiResponse<KametiResponseDto>> {
    try {
      const kameti = await this.kametiRepo.findOne(filter)
      if (!kameti) {
        return ResponseFactory.error(
          'Kameti not found with filter: ' + JSON.stringify(filter),
          'NOT_FOUND',
          'Record not found'
        )
      }
      return ResponseFactory.success(kameti, 'OK', 'Kameti Fetched Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }
  /**
   * Creates a new Kameti record after performing schema validation.
   * @param data - The raw data to be created.
   * @returns A promise resolving to an ApiResponse with the new record or validation errors.
   */
  async create(data: KametiCreateDto): Promise<ApiResponse<KametiResponseDto>> {
    try {
      const parsedData = kametiCreateDto.safeParse(data)

      if (!parsedData.success) {
        return ResponseFactory.error(
          'Data Validation Failed',
          'BAD_REQUEST',
          parsedData.error.message
        )
      }

      const validatedData = parsedData.data
      const kameti = await this.kametiRepo.create(validatedData)

      if (!kameti) {
        return ResponseFactory.error('Failed to create kameti', 'SERVER_ERROR', 'Unknown error')
      }

      return ResponseFactory.success(kameti, 'CREATED', 'Kameti Created Successfully.')
    } catch (error) {
      // Handle Unique Constraint Violation
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return ResponseFactory.error(
          'A Kameti with this title already exists.',
          'CONFLICT',
          'Unique constraint failed on the fields: title'
        )
      }

      return ResponseFactory.exception(error as Error)
    }
  }

  /**
   * Updates an existing Kameti record.
   * @param id - ID of the record.
   * @param data - Partial update payload.
   * @returns A promise resolving to the updated DTO.
   */
  async update(id: number, data: KametiUpdateDto): Promise<ApiResponse<KametiResponseDto>> {
    try {
      const parsedData = kametiUpdateDto.safeParse(data)
      if (!parsedData.success) {
        return ResponseFactory.error(
          'Data Validation Failed',
          'BAD_REQUEST',
          parsedData.error.message
        )
      }
      const validatedData = parsedData.data

      const existingKameti = await this.kametiRepo.findById(id)
      if (!existingKameti) {
        return ResponseFactory.error(
          'Kameti not found with id: ' + id,
          'NOT_FOUND',
          'Record not found'
        )
      }

      const kameti = await this.kametiRepo.update(id, validatedData)

      if (!kameti) {
        return ResponseFactory.error('Failed to update kameti', 'SERVER_ERROR', 'Unknown error')
      }
      return ResponseFactory.success(kameti, 'OK', 'Kameti Updated Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  /**
   * Removes a Kameti record by ID.
   * @param id - ID of the record to delete.
   * @returns A promise resolving to the deleted DTO.
   */
  async delete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const kameti = await this.kametiRepo.delete(id)
      if (!kameti) {
        return ResponseFactory.error('Failed to delete kameti', 'SERVER_ERROR', 'Unknown error')
      }
      return ResponseFactory.success(true, 'OK', 'Kameti Deleted Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }
}
