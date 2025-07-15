

export class PaginationDto {

  private constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly offset: number,
  ) {}

  static create( page: number = 1, limit: number = 10, offset = 0 ): [string?, PaginationDto?] {

    if ( isNaN(page) || isNaN(limit) || isNaN(offset) ) return ['Page offset and Limit must be numbers'];

    if ( page <= 0 ) return ['Page must be greater than 0'];
    if ( limit <= 0 ) return ['Limit must be greater than 0']

    return [ undefined, new PaginationDto(page, limit, offset) ];
  }

}