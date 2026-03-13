import { CustomError } from "../../../domain/errors/custom-error";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly isAvailable: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly userId: string,
    public readonly categoryId: string,
  ) {}

  public static create = (body: Record<string, any>): CreateProductDto => {
    const { name, isAvailable, price, description, user, category } = body;

    if (!name) throw CustomError.badRequest("Products require a name");
    if (!price) throw CustomError.badRequest("Price property is required");
    if (isNaN(price))
      throw CustomError.badRequest("Invalid Price type recieved");
    if (!description) throw CustomError.badRequest("Description is required");
    if (!user)
      throw CustomError.internalServer(
        "User not found. An user needs to be linked",
      );
    if (!category)
      throw CustomError.badRequest(
        "Category not found. Each product needs to be linked to a category",
      );

    if (isAvailable === undefined)
      throw CustomError.badRequest("Is available property is required");
    const rawIsAvailable = isAvailable.toLowerCase();
    if (rawIsAvailable !== "false" && rawIsAvailable !== "true")
      throw CustomError.badRequest("Invalid value for isAvailable property");

    const booleanIsAvailable = rawIsAvailable === "true";
    return new CreateProductDto(
      name,
      booleanIsAvailable,
      Number(price),
      description,
      user,
      category,
    );
  };
}
