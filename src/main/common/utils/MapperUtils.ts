export class MapperUtils {
  /**
   * Maps a source object (e.g., Prisma model) to a DTO class.
   * Assumes field names match between source and destination (e.g., snake_case).
   *
   * @param source - The source object (Prisma model).
   * @param DtoClass - The DTO class constructor.
   * @returns An instance of the DTO class populated with source data.
   */
  static toDto<T extends object, U extends object>(source: T, DtoClass: new () => U): U {
    const dto = new DtoClass()
    Object.assign(dto, source)
    return dto
  }

  /**
   * Maps an array of source objects to an array of DTOs.
   *
   * @param sources - Array of source objects.
   * @param DtoClass - The DTO class constructor.
   * @returns Array of DTO instances.
   */
  static toDtoList<T extends object, U extends object>(sources: T[], DtoClass: new () => U): U[] {
    return sources.map((source) => this.toDto(source, DtoClass))
  }
}
