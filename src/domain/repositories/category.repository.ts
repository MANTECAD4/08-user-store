import { CreateCategoryDto } from "../../application/dtos/category/create-category.dto";
import { CategoryEntity, CategoryOptions } from "../entities";

export abstract class CategoryRepository {
  abstract getCategories: () => Promise<CategoryEntity[]>;
  abstract createCategory: (
    createCategoryDto: CreateCategoryDto,
  ) => Promise<CategoryEntity>;
}
