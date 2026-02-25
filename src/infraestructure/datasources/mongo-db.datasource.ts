import { UserModel } from "../../data/mongo/models/user.model";
import {
  CreateUserOptions,
  UserDatasource,
} from "../../domain/datasources/user.datasource";
import { UserEntity } from "../../domain/entities/user.entity";

export class MongoDatasource implements UserDatasource {
  public isEmailAlreadyUsed = async (email: string): Promise<boolean> => {
    const mongoUser = await UserModel.findOne({
      email,
    });
    return mongoUser !== null ? true : false;
  };

  public createUser = async (
    options: CreateUserOptions,
  ): Promise<UserEntity> => {
    const newMongoUser = await UserModel.create(options);
    await newMongoUser.save();

    const newUserEntity = UserEntity.fromMongoObject(newMongoUser);

    return newUserEntity;
  };
}
