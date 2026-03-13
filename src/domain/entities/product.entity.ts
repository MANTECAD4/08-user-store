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

  public static create = (options: ProductOptions): ProductEntity => {
    return new ProductEntity(options);
  };
}
