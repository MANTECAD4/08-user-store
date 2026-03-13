import { CustomError } from "../../../domain/errors/custom-error";
import { ProductRepository } from "../../../domain/repositories/product.repository";
import { CreateProductDto } from "../../dtos/product/create-product.dto";

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  public exectute = async (body: Record<string, any>) => {
    if (!body) throw CustomError.badRequest("Empty body. No data recieved");
    const createProductDto = CreateProductDto.create(body);

    const product =
      await this.productRepository.createProduct(createProductDto);
    return product;
  };
}
