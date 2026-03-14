import { Types } from "mongoose";
import { CreateCategoryDto } from "../../application/dtos/category/create-category.dto";
import { CategoryDatasource } from "../../domain/datasources";
import { CategoryEntity } from "../../domain/entities";
import { CategoryModel } from "../../data/mongo";
import { CustomError } from "../../domain/errors/custom-error";
import { PaginationDto } from "../../application/dtos/shared/pagination.dto";

export class MongoCategoryDatasource implements CategoryDatasource {
  public getCategories = async (
    paginationDto: PaginationDto,
  ): Promise<CategoryEntity[]> => {
    const { limit, page } = paginationDto;
    try {
      const mongoCategories = await CategoryModel.find()
        .skip((page - 1) * limit)
        .limit(limit);

      const categoryEntities = mongoCategories.map(
        ({ _id, name, isAvailable, user }) =>
          new CategoryEntity({
            user: user.toString(),
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

  public createCategory = async (
    createCategoryDto: CreateCategoryDto,

    // xd:string
  ): Promise<CategoryEntity> => {
    const { isAvailable, name, user } = createCategoryDto;
    try {
      const id = new Types.ObjectId().toString();
      const newCategoryEntity = new CategoryEntity({
        id,
        name,
        isAvailable,
        user,
      });
      const newMongoCategory = await CategoryModel.create({
        _id: id,
        name,
        isAvailable,
        user,
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
