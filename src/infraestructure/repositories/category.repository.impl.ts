import { CreateCategoryDto } from "../../application/dtos/category/create-category.dto";
import { PaginationDto } from "../../application/dtos/shared/pagination.dto";
import { CategoryDatasource } from "../../domain/datasources";
import { CategoryEntity, CategoryOptions } from "../../domain/entities";
import { CategoryRepository } from "../../domain/repositories/category.repository";

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(private readonly categoryDatasource: CategoryDatasource) {}
  public getCategories = async (
    paginationDto: PaginationDto,
  ): Promise<CategoryEntity[]> => {
    return this.categoryDatasource.getCategories(paginationDto);
  };
  public createCategory = async (
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> => {
    return this.categoryDatasource.createCategory(createCategoryDto);
  };
}
