import { CustomError } from "../errors/custom-error";

export interface ProductOptions {
  id: string;
  name: string;
  isAvailable: boolean;
  price: number;
  description: string;
  user: string;
  category: string;
}

export class ProductEntity {
  public id: string;
  public name: string;
  public isAvailable: boolean;
  public price: number;
  public description: string;
  public user: string;
  public category: string;

  private constructor(options: ProductOptions) {
    const { category, user, description, isAvailable, name, price, id } =
      options;

    this.id = id;
    this.name = name;
    this.isAvailable = isAvailable;
    this.price = price;
    this.description = description;
    this.user = user;
    this.category = category;
  }

  public static createFromObject = (options: ProductOptions): ProductEntity => {
    const { category, description, id, isAvailable, name, price, user } =
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
    if (!category)
      throw CustomError.badRequest(
        "Missing category property to create Prodduct entity",
      );
    if (!user)
      throw CustomError.badRequest(
        "Missing user property to create Prodduct entity",
      );
    return new ProductEntity(options);
  };
}
