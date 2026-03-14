export interface CategoryOptions {
  id: string;
  name: string;
  isAvailable: boolean;
  user: string;
}

export class CategoryEntity {
  public id: string;
  public name: string;
  public isAvailable: boolean;
  public user: string;
  public constructor(options: CategoryOptions) {
    const { isAvailable, name, user: userId, id } = options;
    this.id = id;
    this.name = name;
    this.isAvailable = isAvailable;
    this.user = userId;
  }
}
