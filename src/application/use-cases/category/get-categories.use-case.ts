import { CategoryEntity } from "../../../domain/entities";
import { CategoryRepository } from "../../../domain/repositories/category.repository";
import { PaginationDto } from "../../dtos/shared/pagination.dto";

export class GetCategoriesUseCase {
  constructor(private categoryrepository: CategoryRepository) {}
  public execute = async (query: Record<string, any>) => {
    const paginationDto = PaginationDto.create(query);
    const categories =
      await this.categoryrepository.getCategories(paginationDto);
    return { categories, page: paginationDto.page, limit: paginationDto.limit };
  };
}
