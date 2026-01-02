import { z } from 'zod'

/**
 * Zod validation schema for updating a User.
 * All fields are optional to allow partial updates.
 */
export const userUpdateDto = z.object({
  /** Full name of the user */
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(100, 'Name must be at most 100 characters long')
    .optional(),

  /** Father's name (optional) */
  father_name: z
    .string()
    .min(3, 'Father name must be at least 3 characters long')
    .max(100, 'Father name must be at most 100 characters long')
    .optional(),

  /** Phone number (optional, must be unique in DB) */
  phone_no: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Phone number must be a valid 10-digit Indian number')
    .optional(),

  /** Profile image path (optional) */
  profile_image: z.string().optional(),

  /** User current status */
  status: z.enum(['Active', 'Inactive', 'Defaulter']).optional(),

  /** Aadhaar number (optional) */
  aadhaar_number: z
    .string()
    .regex(/^\d{12}$/, 'Aadhaar number must be exactly 12 digits')
    .optional(),

  /** Reference user ID (self-reference) */
  reference: z.number().int().positive().optional()
})

/** TypeScript type inferred from the Zod schema */
export type UserUpdateDto = z.infer<typeof userUpdateDto>
