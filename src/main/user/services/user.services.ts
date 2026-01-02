import { User } from '@prisma/client'
import { ApiResponse } from '../../common/ApiResponse/IApiResponse'
import { ResponseFactory } from '../../common/ApiResponse/Response.Factory'
import { IUserRepo } from '../repository/interface/IUser.repo'
import { UserCreateDto, userCreateDto } from '../schema/userCreate.dto'
import { UserUpdateDto, userUpdateDto } from '../schema/userUpdate.dto'
import { PaginatedResponse } from '../../common/interfaces/IPaginatedResponse'

/**
 * Service class handling the business logic for User operations.
 * Acts as a bridge between IPC handlers and the Data Access Layer (Repository).
 * Standardizes outputs into ApiResponse objects.
 */
export class UserService {
  /**
   * Initializes the service with an injected repository.
   * @param userRepo - An implementation of the IUserRepo interface.
   */
  constructor(private userRepo: IUserRepo) {}

  /**
   * Fetches all User records with optional filtering and pagination.
   * @returns A promise resolving to a success or error ApiResponse with paginated data.
   */
  async findAll(): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const result = await this.userRepo.findAll()
      return ResponseFactory.success(
        result as PaginatedResponse<User>,
        'OK',
        'Users Fetched Successfully.'
      )
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  /**
   * Fetches a specific User by ID with validation and error handling.
   * @param id - The ID of the User to find.
   * @returns A promise resolving to an ApiResponse with the record or an error.
   */
  async findById(id: number): Promise<ApiResponse<User | null>> {
    try {
      if (!id || id <= 0) {
        return ResponseFactory.error('Invalid ID provided', 'BAD_REQUEST', 'Validation failed')
      }
      const user = await this.userRepo.findById(id)
      if (!user) {
        return ResponseFactory.error(
          'User not found with id: ' + id,
          'NOT_FOUND',
          'Record not found'
        )
      }
      return ResponseFactory.success(user, 'OK', 'User Fetched Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  /**
   * Fetches a single User by filter criteria.
   * @param filter - Partial User object with filter fields.
   * @returns A promise resolving to an ApiResponse with the record or an error.
   */
  async findOne(filter: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const user = await this.userRepo.findOne(filter)
      if (!user) {
        return ResponseFactory.error(
          'User not found with filter: ' + JSON.stringify(filter),
          'NOT_FOUND',
          'Record not found'
        )
      }
      return ResponseFactory.success(user, 'OK', 'User Fetched Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  /**
   * Creates a new User record with image upload and reference validation.
   * @param data - The user data to create.
   * @returns A promise resolving to an ApiResponse with the new record or validation errors.
   */
  async create(data: UserCreateDto): Promise<ApiResponse<User>> {
    try {
      // Validate data using Zod schema
      const parsedData = userCreateDto.safeParse(data)

      if (!parsedData.success) {
        return ResponseFactory.error(
          'Data Validation Failed',
          'BAD_REQUEST',
          parsedData.error.message
        )
      }

      const validatedData = parsedData.data

      // Validate reference user exists if provided
      if (validatedData.reference) {
        const referenceUser = await this.userRepo.findById(validatedData.reference)
        if (!referenceUser) {
          return ResponseFactory.error(
            'Reference user not found with id: ' + validatedData.reference,
            'NOT_FOUND',
            'Invalid reference'
          )
        }
      }

      // Prepare user data (profile_image should be handled separately via file upload endpoints)
      const userData: Partial<UserCreateDto> = {
        name: validatedData.name,
        father_name: validatedData.father_name,
        phone_no: validatedData.phone_no,
        profile_image: validatedData.profile_image as string,
        aadhaar_number: validatedData.aadhaar_number,
        reference: validatedData.reference
      }

      // Create user
      const user = await this.userRepo.create(userData as UserCreateDto)

      if (!user) {
        return ResponseFactory.error('Failed to create user', 'SERVER_ERROR', 'Unknown error')
      }

      return ResponseFactory.success(user, 'CREATED', 'User Created Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  /**
   * Updates an existing User record with optional image handling.
   * @param id - The ID of the user to update.
   * @param data - The partial data to update.
   * @returns A promise resolving to an ApiResponse with the updated record or an error.
   */
  async update(id: number, data: UserUpdateDto): Promise<ApiResponse<User>> {
    try {
      if (!id || id <= 0) {
        return ResponseFactory.error('Invalid ID provided', 'BAD_REQUEST', 'Validation failed')
      }

      // Validate data using Zod schema
      const parsedData = userUpdateDto.safeParse(data)

      if (!parsedData.success) {
        return ResponseFactory.error(
          'Data Validation Failed',
          'BAD_REQUEST',
          parsedData.error.message
        )
      }

      const validatedData = parsedData.data

      // Check if user exists
      const existingUser = await this.userRepo.findById(id)
      if (!existingUser) {
        return ResponseFactory.error(
          'User not found with id: ' + id,
          'NOT_FOUND',
          'Record not found'
        )
      }

      // Prepare update data (profile_image should be handled separately via file upload endpoints)
      const updateData: Partial<UserUpdateDto> = { ...validatedData }

      // Include profile_image if provided
      if (validatedData.profile_image) {
        updateData.profile_image = validatedData.profile_image
      }

      // Update user
      const updatedUser = await this.userRepo.update(id, updateData as UserUpdateDto)

      if (!updatedUser) {
        return ResponseFactory.error('Failed to update user', 'SERVER_ERROR', 'Unknown error')
      }

      return ResponseFactory.success(updatedUser, 'OK', 'User Updated Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  /**
   * Deletes a User record.
   * @param id - The ID of the user to delete.
   * @returns A promise resolving to an ApiResponse with success or error.
   */
  async delete(id: number): Promise<ApiResponse<boolean>> {
    try {
      if (!id || id <= 0) {
        return ResponseFactory.error('Invalid ID provided', 'BAD_REQUEST', 'Validation failed')
      }

      // Check if user exists
      const existingUser = await this.userRepo.findById(id)
      if (!existingUser) {
        return ResponseFactory.error(
          'User not found with id: ' + id,
          'NOT_FOUND',
          'Record not found'
        )
      }

      // Delete user
      const deletedSuccessfully = await this.userRepo.delete(id)

      if (!deletedSuccessfully) {
        return ResponseFactory.error('Failed to delete user', 'SERVER_ERROR', 'Unknown error')
      }

      return ResponseFactory.success(true, 'OK', 'User Deleted Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }
}
