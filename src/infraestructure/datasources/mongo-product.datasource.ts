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
    const { limit, page } = paginationDto;
    try {
      const mongoProducts = await ProductModel.find()
        .skip((page - 1) * limit)
        .limit(limit);

      const productEntities = mongoProducts.map(
        ({ _id, isAvailable, name, description, userId, categoryId, price }) =>
          ProductEntity.createFromObject({
            id: _id.toString(),
            name,
            description,
            price,
            isAvailable,
            categoryId: categoryId.toString(),
            userId: userId.toString(),
          }),
      );
      return productEntities;
    } catch (error) {
      throw CustomError.internalServer(
        "Something went wrong while loading products from DB",
      );
    }
  };

  public createProduct = async (
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> => {
    const { categoryId, description, isAvailable, name, price, userId } =
      createProductDto;
    try {
      const id = new Types.ObjectId().toString();
      const newProductEntity = ProductEntity.createFromObject({
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
