import z from 'zod'

/**
 * Zod validation schema for updating an existing Kameti.
 * All fields are optional to support partial updates (Patch).
 */
export const kametiUpdateDto = z.object({
  /** Title update (optional) */
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title must be at most 100 characters long')
    .optional(),

  /** Budget amount update (optional) */
  budget: z.number().min(1, 'Budget must be greater than 0').optional(),

  /** Total months update (optional) */
  months: z.number().min(1, 'Months must be greater than 0').optional(),

  /** Installment amount update (optional) */
  installment: z.number().min(1, 'Installment must be greater than 0').optional(),

  /** Lifecycle status update (optional) */
  status: z.enum(['ACTIVE', 'INACTIVE', 'COMPLETED']).optional()
})

/** TypeScript type inferred from the Update Zod schema */
export type KametiUpdateDto = z.infer<typeof kametiUpdateDto>
