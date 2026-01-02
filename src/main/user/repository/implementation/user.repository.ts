import { PrismaClient, User } from '@prisma/client'
import { UserCreateDto } from '../../schema/userCreate.dto'
import { UserUpdateDto } from '../../schema/userUpdate.dto'
import { UserResponseDto } from '../../schema/UserResponse.dto'
import { IUserRepo } from '../interface/IUser.repo'
import { CommonRepo } from '../../../common/CommonRepo/Common.Repo'
import { PaginatedResponse } from '../../../common/interfaces/IPaginatedResponse'

/**
 * Prisma-based implementation of the IUserRepo interface.
 *
 * Inherits base implementation from `CommonRepo` and extends with user-specific logic.
 * Implements methods for `findAll`, `findById`, `create`, `findOne`, `update`, and `delete`.
 */
export class UserRepository
  extends CommonRepo<User, UserCreateDto, void>
  implements IUserRepo
{
  /**
   * Initializes the repository with an injected Prisma client.
   * Passes `prisma.user` to the generic `CommonRepo` superclass.
   * @param prisma - The singleton instance of PrismaClient.
   */
  constructor(private prisma: PrismaClient) {
    super(prisma.user)
  }

  /**
   * Retrieves all User records with pagination.
   * @returns Paginated response with user data and pagination metadata.
   */
  async findAll(): Promise<PaginatedResponse<User>> {
    const data = await this.prisma.user.findMany()
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
   * Creates a new User record.
   * @param data - The user creation data.
   * @returns The created user record.
   */
  async create(data: UserCreateDto): Promise<User> {
    return await this.prisma.user.create({ data })
  }

  /***
   * Retrieves a single User record matching specific filter criteria.
   * @param filter - Partial User object with filter fields.
   * @returns The matching user or null if not found.
   */
  async findOne(filter: Partial<User>): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findFirst({
      where: filter
    })
    return user ? (user as UserResponseDto) : null
  }

  /**
   * Updates an existing User record.
   * @param id - The ID of the user to update.
   * @param data - The partial data to update.
   * @returns The updated user record.
   */
  async update(id: number, data: Partial<UserUpdateDto>): Promise<UserResponseDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data
    })
    return user as UserResponseDto
  }

  /**
   * Deletes a User record by ID.
   * @param id - The ID of the user to delete.
   * @returns True if deletion was successful.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id }
      })
      return true
    } catch (error) {
      return false
    }
  }
}