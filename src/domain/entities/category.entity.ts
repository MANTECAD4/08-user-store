export interface CategoryOptions {
  id: string;
  name: string;
  isAvailable: boolean;
  userId: string;
}

export class CategoryEntity {
  public id: string;
  public name: string;
  public isAvailable: boolean;
  public userId: string;
  public constructor(options: CategoryOptions) {
    const { isAvailable, name, userId, id } = options;
    this.id = id;
    this.name = name;
    this.isAvailable = isAvailable;
    this.userId = userId;
  }
}
