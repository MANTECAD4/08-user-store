import { CreateCategoryDto } from "../../application/dtos/category/create-category.dto";
import { PaginationDto } from "../../application/dtos/shared/pagination.dto";
import { CategoryEntity, CategoryOptions } from "../entities";

export abstract class CategoryRepository {
  abstract getCategories: (
    paginationDto: PaginationDto,
  ) => Promise<CategoryEntity[]>;
  abstract createCategory: (
    createCategoryDto: CreateCategoryDto,
  ) => Promise<CategoryEntity>;
}
