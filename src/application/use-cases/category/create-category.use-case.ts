import { CategoryEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors/custom-error";
import { CategoryRepository } from "../../../domain/repositories/category.repository";
import { CreateCategoryDto } from "../../dtos/category/create-category.dto";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}
  public execute = async (
    body: Record<string, any>,
  ): Promise<{ category: CategoryEntity }> => {
    if (!body) throw CustomError.badRequest("Empty body. No data recieved");
    const createCategoryDto = CreateCategoryDto.create(body);

    const category =
      await this.categoryRepository.createCategory(createCategoryDto);
    return { category };
  };
}
