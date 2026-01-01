import { ApiResponse } from './IApiResponse'

/**
 * Factory class for creating standardized ApiResponse objects.
 * Simplifies the creation of success, error, and exception payloads.
 */
export class ResponseFactory {
  /**
   * Generates a successful response.
   *
   * @param data - The data payload to return.
   * @param status - The HTTP status string (default: 'success').
   * @param message - A descriptive success message.
   * @returns A structured ApiResponse indicating success.
   */
  static success<T>(
    data: T,
    status: string = 'success',
    message: string = 'Operation completed successfully'
  ): ApiResponse<T> {
    return {
      success: true,
      status,
      message,
      data
    }
  }

  /**
   * Generates an error response for validation or business logic failures.
   *
   * @param message - The main error message for the user.
   * @param status - The category of the error (default: 'error').
   * @param error - Technical details about the error.
   * @param data - Optional data payload.
   * @returns A structured ApiResponse indicating failure.
   */
  static error<T>(
    message: string = 'Operation failed',
    status: string = 'error',
    error: string = 'Operation failed',
    data?: T
  ): ApiResponse<T> {
    return {
      success: false,
      status,
      message,
      error,
      data
    }
  }

  /**
   * Generates a response during an unexpected catch block (exception).
   *
   * @param error - The actual Error object caught.
   * @param data - Optional data payload.
   * @param status - The exception status (default: 'exception').
   * @param message - A descriptive message for the exception.
   * @returns A structured ApiResponse indicating an exception.
   */
  static exception<T>(
    error: Error,
    data?: T,
    status: string = 'exception',
    message: string = 'An exception occurred'
  ): ApiResponse<T> {
    return {
      success: false,
      status,
      message,
      error: error.message,
      data
    }
  }
}
