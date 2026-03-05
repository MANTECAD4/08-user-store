import { CreateCategoryDto } from "../../application/dtos/category/create-category.dto";
import { CategoryDatasource } from "../../domain/datasources";
import { CategoryEntity, CategoryOptions } from "../../domain/entities";
import { CategoryRepository } from "../../domain/repositories/category.repository";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDatasource: CategoryDatasource) {}
  public getCategories = async (): Promise<CategoryEntity[]> => {
    return this.categoryDatasource.getCategories();
  };
  public createCategory = async (
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> => {
    return this.categoryDatasource.createCategory(createCategoryDto);
  };
}
