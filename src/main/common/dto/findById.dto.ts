import z from 'zod'

export const findByIdDto = z.object({
  id: z.number().int().positive().min(1, { message: 'ID must be a positive integer' })
})
