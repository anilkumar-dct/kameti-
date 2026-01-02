/**
 * Generic API response structure used for consistent communication between
 * the Main and Renderer processes.
 *
 * @template T - The type of the data payload.
 */
export interface ApiResponse<T> {
  /** HTTP style status string (e.g., 'OK', 'error', 'exception') */
  status: string
  /** Boolean flag indicating if the operation was successful */
  success: boolean
  /** Human-readable message describing the outcome */
  message: string
  /** The actual data payload returning from the service */
  data?: T
  /** Detailed error message, if any */
  error?: string
}
