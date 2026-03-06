import { CustomError } from "../../../domain/errors/custom-error";

export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}

  public static create = (reqQuery: Record<string, any>): PaginationDto => {
    const { page = 1, limit = 10 } = reqQuery;
    const numPage = Number(page);
    const numLimit = Number(limit);
    if (isNaN(numPage)) throw CustomError.badRequest("Page is not a number");
    if (isNaN(numLimit)) throw CustomError.badRequest("limit is not a number");

    if (numPage < 1)
      throw CustomError.badRequest("Page must be greater than zero.");
    if (numLimit < 1)
      throw CustomError.badRequest("Limit must be greater than zero.");

    return new PaginationDto(numPage, numLimit);
  };
}
