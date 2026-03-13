import { ProductRepository } from "../../../domain/repositories/product.repository";
import { PaginationDto } from "../../dtos/shared/pagination.dto";

export class GetProductsUseCase {
  public constructor(private readonly productRepository: ProductRepository) {}

  public execute = async (query: Record<string, any>) => {
    const paginationDto = PaginationDto.create(query);
    const products = await this.productRepository.getProducts(paginationDto);
    return {
      page: paginationDto.page,
      limit: paginationDto.limit,
      products,
    };
  };
}
