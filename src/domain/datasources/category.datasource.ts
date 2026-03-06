import { CreateCategoryDto } from "../../application/dtos/category/create-category.dto";
import { PaginationDto } from "../../application/dtos/shared/pagination.dto";
import { CategoryEntity } from "../entities";

export abstract class CategoryDatasource {
  abstract getCategories: (
    paginationDto: PaginationDto,
  ) => Promise<CategoryEntity[]>;
  abstract createCategory: (
    createCategoryDto: CreateCategoryDto,
  ) => Promise<CategoryEntity>;
}
