import { CreateCategoryDto } from "../../application/dtos/category/create-category.dto";
import { CategoryEntity } from "../entities";
import { CategoryOptions } from "../entities/category.entity";

export abstract class CategoryDatasource {
  abstract getCategories: () => Promise<CategoryEntity[]>;
  abstract createCategory: (
    createCategoryDto: CreateCategoryDto,
  ) => Promise<CategoryEntity>;
}
