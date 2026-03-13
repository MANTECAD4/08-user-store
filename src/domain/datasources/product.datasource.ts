import { CreateProductDto } from "../../application/dtos/product/create-product.dto";
import { PaginationDto } from "../../application/dtos/shared/pagination.dto";
import { ProductEntity } from "../entities";

export abstract class ProductDatasource {
  abstract getProducts: (
    paginationDto: PaginationDto,
  ) => Promise<ProductEntity[]>;
  abstract createProduct: (
    createProductDto: CreateProductDto,
  ) => Promise<ProductEntity>;
}
