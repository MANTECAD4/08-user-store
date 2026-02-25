import { Types } from "mongoose";
import { UserModel } from "../../data/mongo/models/user.model";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";

export class MongoDatasource implements UserDatasource {
  public isEmailAlreadyUsed = async (email: string): Promise<boolean> => {
    const mongoUser = await UserModel.findOne({
      email,
    });
    return mongoUser !== null ? true : false;
  };

  public registerUser = async (
    registerUserDto: RegisterUserDto,
  ): Promise<UserEntity> => {
    const mongoId = new Types.ObjectId().toString();

    const newUserEntity = UserEntity.createClassic(mongoId, registerUserDto);
    const { id, ...rest } = newUserEntity;

    const newMongoUser = await UserModel.create({
      _id: mongoId,
      ...rest,
    });
    await newMongoUser.save();

    return newUserEntity;
  };
}
