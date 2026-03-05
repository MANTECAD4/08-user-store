import { Types } from "mongoose";
import { CreateCategoryDto } from "../../application/dtos/category/create-category.dto";
import { CategoryDatasource } from "../../domain/datasources";
import { CategoryEntity } from "../../domain/entities";
import { CategoryModel } from "../../data/mongo";
import { CustomError } from "../../domain/errors/custom-error";

export class MongoCategoryDatasource implements CategoryDatasource {
  public getCategories = async (): Promise<CategoryEntity[]> => {
    try {
      const mongoCategories = await CategoryModel.find();
      const categoryEntities = mongoCategories.map(
        ({ _id, name, isAvailable, userId }) =>
          new CategoryEntity({
            userId: userId.toString(),
            id: _id.toString(),
            name,
            isAvailable,
          }),
      );
      return categoryEntities;
    } catch (error) {
      throw CustomError.internalServer(
        "Error while getting categories from DB",
      );
    }
  };

  public createCategory = async ({
    isAvailable,
    name,
    userId,
  }: CreateCategoryDto): Promise<CategoryEntity> => {
    try {
      const id = new Types.ObjectId().toString();
      const newCategoryEntity = new CategoryEntity({
        id,
        name,
        isAvailable,
        userId,
      });
      const newMongoCategory = await CategoryModel.create({
        _id: id,
        name,
        isAvailable,
        userId: userId,
      });
      return newCategoryEntity;
    } catch (error) {
      console.log(error);
      throw CustomError.internalServer(
        "Error while registering new category into DB",
      );
    }
  };
}
