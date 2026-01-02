import { z } from 'zod'

/**
 * Zod validation schema for creating a new User.
 * Ensures data integrity before reaching the database.
 */
export const userCreateDto = z.object({
  /** Full name of the user */
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(100, 'Name must be at most 100 characters long'),

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

  /** Aadhaar number (optional) */
  aadhaar_number: z
    .string()
    .regex(/^\d{12}$/, 'Aadhaar number must be exactly 12 digits')
    .optional(),

  /** Reference user ID (self-reference) */
  reference: z.number().int().positive().nullable()
})

/** TypeScript type inferred from the Zod schema */
export type UserCreateDto = z.infer<typeof userCreateDto>
