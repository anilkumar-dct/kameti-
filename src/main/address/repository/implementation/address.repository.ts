import { PrismaClient } from '@prisma/client/extension'
import { AddressCreateDto } from '../../schema/addressCreate.dto'
import { AddressResponseDto } from '../../schema/addressResponse.dto'
import { AddressUpdateDto } from '../../schema/addressUpdate.dto'
import { PaginatedResponse } from '../../../common/interfaces/IPaginatedResponse'

export class AddressRepository {
  // Implementation of repository methods goes here

  constructor(private prisma: PrismaClient) {}
  async findAll(): Promise<PaginatedResponse<AddressResponseDto>> {
    const data = await this.prisma.address.findMany()
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

  async findByUserId(userId: number): Promise<AddressResponseDto[]> {
    return (await this.prisma.address.findMany({
      where: { userId }
    })) as AddressResponseDto[]
  }
  async create(data: AddressCreateDto): Promise<AddressResponseDto> {
    const address = await this.prisma.address.create({ data })
    return address as AddressResponseDto
  }
  async findById(id: number): Promise<AddressResponseDto | null> {
    const address = await this.prisma.address.findUnique({
      where: { id }
    })
    return address ? (address as AddressResponseDto) : null
  }
  async update(id: number, data: Partial<AddressUpdateDto>): Promise<AddressResponseDto> {
    const address = await this.prisma.address.update({
      where: { id },
      data
    })
    return address as AddressResponseDto
  }
  async delete(id: number): Promise<boolean> {
    await this.prisma.address.delete({
      where: { id }
    })
    return true
  }
}
