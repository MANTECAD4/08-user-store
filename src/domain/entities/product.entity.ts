import { CustomError } from "../errors/custom-error";

export interface ProductOptions {
  id: string;
  name: string;
  isAvailable: boolean;
  price: number;
  description: string;
  userId: string;
  categoryId: string;
}

export class ProductEntity {
  public id: string;
  public name: string;
  public isAvailable: boolean;
  public price: number;
  public description: string;
  public userId: string;
  public categoryId: string;

  private constructor(options: ProductOptions) {
    const { categoryId, userId, description, isAvailable, name, price, id } =
      options;

    this.id = id;
    this.name = name;
    this.isAvailable = isAvailable;
    this.price = price;
    this.description = description;
    this.userId = userId;
    this.categoryId = categoryId;
  }

  public static createFromObject = (options: ProductOptions): ProductEntity => {
    const { categoryId, description, id, isAvailable, name, price, userId } =
      options;
    if (!name)
      throw CustomError.badRequest(
        "Name is required to create a new Product entity",
      );
    if (!description)
      throw CustomError.badRequest(
        "Description is required to create a new Product entity",
      );
    if (!id)
      throw CustomError.badRequest("Missing Id to create Prodduct entity");
    if (isAvailable === undefined)
      throw CustomError.badRequest(
        "Missing isAvailable property to create Prodduct entity",
      );
    if (!price)
      throw CustomError.badRequest(
        "Missing price property to create Prodduct entity",
      );
    if (!categoryId)
      throw CustomError.badRequest(
        "Missing categoryId property to create Prodduct entity",
      );
    if (!userId)
      throw CustomError.badRequest(
        "Missing userId property to create Prodduct entity",
      );
    return new ProductEntity(options);
  };
}
