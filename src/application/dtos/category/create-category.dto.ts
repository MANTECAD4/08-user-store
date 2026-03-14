import { CustomError } from "../../../domain/errors/custom-error";

export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly isAvailable: boolean,
    public readonly user: string,
  ) {}

  public static create = (body: Record<string, any>) => {
    const { name, user, isAvailable } = body;

    if (!name) throw CustomError.badRequest("Category name is required.");

    if (isAvailable === undefined)
      throw CustomError.badRequest("Category requires isAvailable property");

    if (!user)
      throw CustomError.internalServer(
        `User not found. An user needs to be linked to category's creation`,
      );

    const rawIsAvailable = isAvailable.toLowerCase();
    if (rawIsAvailable !== "false" && rawIsAvailable !== "true")
      throw CustomError.badRequest("Invalid value for isAvailable property");

    const booleanIsAvailable = rawIsAvailable === "true";

    return new CreateCategoryDto(name, booleanIsAvailable, user);
  };
}
