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
        ({
          _id,
          isAvailable,
          name,
          description,
          user: userId,
          category: categoryId,
          price,
        }) =>
          ProductEntity.createFromObject({
            id: _id.toString(),
            name,
            description,
            price,
            isAvailable,
            category: categoryId.toString(),
            user: userId.toString(),
          }),
      );
      return productEntities;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(
        "Something went wrong while loading products from DB",
      );
    }
  };

  public createProduct = async (
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> => {
    const { category, description, isAvailable, name, price, user } =
      createProductDto;
    try {
      const id = new Types.ObjectId().toString();
      const newProductEntity = ProductEntity.createFromObject({
        id,
        name,
        description,
        price,
        category,
        user,
        isAvailable,
      });
      const newMongoProduct = await ProductModel.create(newProductEntity);
      return newProductEntity;
    } catch (error) {
      throw CustomError.internalServer("Error while creating a new product");
    }
  };
}
