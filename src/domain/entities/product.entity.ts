export interface ProductOptions {
  name: string;
  isAvailable: boolean;
  price: number;
  description: string;
  userId: string;
  categoryId: string;
}

export class ProductEntity {
  public name: string;
  public isAvailable: boolean;
  public price: number;
  public description: string;
  public userId: string;
  public categoryId: string;

  private constructor(options: ProductOptions) {
    const { categoryId, userId, description, isAvailable, name, price } =
      options;

    this.name = name;
    this.isAvailable = isAvailable;
    this.price = price;
    this.description = description;
    this.userId = userId;
    this.categoryId = categoryId;
  }

  public create = (
    options: Omit<ProductOptions, "isAvailable">,
  ): ProductEntity => {
    return new ProductEntity({
      ...options,
      isAvailable: false,
    });
  };
}
