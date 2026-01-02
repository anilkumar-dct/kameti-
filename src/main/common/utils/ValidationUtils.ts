import { ZodSchema } from 'zod'
import { ResponseFactory } from '../ApiResponse/Response.Factory'
import { ApiResponse } from '../interfaces/IApiResponse'

/**
 * Utility class for centralized schema validation using Zod.
 * Ensures data conforms to specific shapes before processing.
 */
export class ValidationUtils {
  /**
   * Validates data against a Zod schema.
   * @param schema - The Zod schema definition.
   * @param data - The data to validate.
   * @returns An object containing either the success status and data, or the error response.
   */
  static validate<T>(
    schema: ZodSchema<T>,
    data: unknown
  ): { success: true; data: T } | { success: false; error: ApiResponse<never> } {
    const parsedData = schema.safeParse(data)
    if (!parsedData.success) {
      return {
        success: false,
        error: ResponseFactory.error<never>(
          'Data Validation Failed',
          'BAD_REQUEST',
          parsedData.error.message
        )
      }
    }
    return { success: true, data: parsedData.data }
  }
}
