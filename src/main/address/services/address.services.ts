import { ApiResponse } from '../../common/interfaces/IApiResponse'
import { ResponseFactory } from '../../common/ApiResponse/Response.Factory'
import { PaginatedResponse } from '../../common/interfaces/IPaginatedResponse'
import { IAddressRepo } from '../repository/interface/IAddress.repo'
import { AddressCreateDto } from '../schema/addressCreate.dto'
import { AddressResponseDto } from '../schema/addressResponse.dto'
import { AddressUpdateDto } from '../schema/addressUpdate.dto'

export class addressService {
  constructor(private addressRepo: IAddressRepo) {}

  async findAll(): Promise<ApiResponse<PaginatedResponse<AddressResponseDto>>> {
    try {
      const result = await this.addressRepo.findAll()
      return ResponseFactory.success(
        result as PaginatedResponse<AddressResponseDto>,
        'OK',
        'Addresses Fetched Successfully.'
      )
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  async findByUserId(userId: number): Promise<ApiResponse<AddressResponseDto[]>> {
    try {
      if (!userId || userId <= 0) {
        return ResponseFactory.error('Invalid User ID')
      }
      const result = await this.addressRepo.findByUserId(userId)
      return ResponseFactory.success(
        result as AddressResponseDto[],
        'OK',
        'Addresses Fetched Successfully.'
      )
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  async create(data: AddressCreateDto): Promise<ApiResponse<AddressResponseDto>> {
    try {
      const result = await this.addressRepo.create(data)
      return ResponseFactory.success(
        result as AddressResponseDto,
        'CREATED',
        'Address Created Successfully.'
      )
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  async update(id: number, data: AddressUpdateDto): Promise<ApiResponse<AddressResponseDto>> {
    try {
      if (!id || id <= 0) {
        return ResponseFactory.error('Invalid ID provided', 'BAD_REQUEST', 'Validation failed')
      }
      const existing = await this.addressRepo.findById(id)
      if (!existing) {
        return ResponseFactory.error(
          'Address not found with id: ' + id,
          'NOT_FOUND',
          'Record not found'
        )
      }
      const result = await this.addressRepo.update(id, data)
      return ResponseFactory.success(
        result as AddressResponseDto,
        'OK',
        'Address Updated Successfully.'
      )
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    try {
      if (!id || id <= 0) {
        return ResponseFactory.error('Invalid ID provided', 'BAD_REQUEST', 'Validation failed')
      }
      const existing = await this.addressRepo.findById(id)
      if (!existing) {
        return ResponseFactory.error(
          'Address not found with id: ' + id,
          'NOT_FOUND',
          'Record not found'
        )
      }
      await this.addressRepo.delete(id)
      return ResponseFactory.success(null, 'OK', 'Address Deleted Successfully.')
    } catch (error) {
      return ResponseFactory.exception(error as Error)
    }
  }
}
