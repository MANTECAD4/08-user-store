export interface CategoryOptions {
  name: string;
  isAvailable: boolean;
  userId: string;
}

export class CategoryEntity {
  public name: string;
  public isAvailable: boolean;
  public userId: string;
  private constructor(options: CategoryOptions) {
    const { isAvailable, name, userId } = options;
    this.name = name;
    this.isAvailable = isAvailable;
    this.userId = userId;
  }

  public static create = (name: string, userId: string): CategoryEntity => {
    return new CategoryEntity({
      name,
      isAvailable: false,
      userId,
    });
  };
}
