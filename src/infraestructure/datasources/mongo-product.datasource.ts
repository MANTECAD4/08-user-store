import { Types } from "mongoose";
import { CreateProductDto } from "../../application/dtos/product/create-product.dto";
import { PaginationDto } from "../../application/dtos/shared/pagination.dto";
import { ProductDatasource } from "../../domain/datasources/product.datasource";
import { ProductEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom-error";
import { ProductModel } from "../../data/mongo";

export class MongoProductDatasource implements ProductDatasource {
  public getProducts = async (
    paginationDto: PaginationDto,
  ): Promise<ProductEntity[]> => {
    return [];
  };

  public createProduct = async (
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> => {
    const { categoryId, description, isAvailable, name, price, userId } =
      createProductDto;
    try {
      const id = new Types.ObjectId().toString();
      const newProductEntity = ProductEntity.create({
        id,
        name,
        description,
        price,
        categoryId,
        userId,
        isAvailable,
      });
      const newMongoProduct = await ProductModel.create(newProductEntity);
      return newProductEntity;
    } catch (error) {
      throw CustomError.internalServer("Error while creating a new product");
    }
  };
}
