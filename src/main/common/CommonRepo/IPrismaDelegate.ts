/**
 * A generic interface that acts as a bridge to any Prisma Model Delegate.
 *
 * Since Prisma generates unique delegate types for each model (e.g., Prisma.KametiDelegate, Prisma.UserDelegate)
 * that do not share a common base type, this interface defines the "shape" that we expect all delegates to match.
 *
 * This allows our Generic Repository to interact with *any* Prisma model without knowing its specific type.
 *
 * @template T - The Prisma Model type (e.g., Kameti).
 * @template CreateInput - The input type used for creating records (e.g., KametiCreateDto).
 */
export interface PrismaDelegate<T, CreateInput> {
  /** Finds multiple records matching the criteria. */
  findMany(): Promise<T[]>
  /** Finds a unique record by unique field (usually ID). */
  findUnique(args: { where: { id: number } }): Promise<T | null>
  /** Creates a new record. */
  create(args: { data: CreateInput }): Promise<T>
}
