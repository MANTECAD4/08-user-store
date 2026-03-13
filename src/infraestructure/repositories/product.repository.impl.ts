import { CreateProductDto } from "../../application/dtos/product/create-product.dto";
import { PaginationDto } from "../../application/dtos/shared/pagination.dto";
import { ProductDatasource } from "../../domain/datasources/product.datasource";
import { ProductEntity } from "../../domain/entities";
import { ProductRepository } from "../../domain/repositories/product.repository";

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly productDatasource: ProductDatasource) {}

  public getProducts = async (
    paginationDto: PaginationDto,
  ): Promise<ProductEntity[]> => {
    return this.productDatasource.getProducts(paginationDto);
  };

  public createProduct = async (
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> => {
    return this.productDatasource.createProduct(createProductDto);
  };
}
