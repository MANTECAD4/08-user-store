import { CategoryEntity } from "../../../domain/entities";
import { CategoryRepository } from "../../../domain/repositories/category.repository";

export class GetCategoriesUseCase {
  constructor(private categoryrepository: CategoryRepository) {}
  public execute = async (): Promise<CategoryEntity[]> => {
    const categories = await this.categoryrepository.getCategories();
    return categories;
  };
}
