import { Types } from "mongoose";
import { UserModel } from "../../data/mongo/models/user.model";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { PasswordHasher } from "../../presentation/services/password-hasher.service";
import { compareSync } from "bcryptjs";
import { CustomError } from "../../domain/errors/custom-error";

export class MongoDatasource implements UserDatasource {
  public isEmailAlreadyUsed = async (email: string): Promise<boolean> => {
    const mongoUser = await UserModel.findOne({
      email,
    });
    return mongoUser !== null ? true : false;
  };

  public registerUser = async ({
    email,
    name,
    password,
  }: RegisterUserDto): Promise<UserEntity> => {
    const mongoId = new Types.ObjectId().toString();

    const newUserEntity = UserEntity.createClassic(mongoId, {
      email,
      name,
      password: PasswordHasher.hash(password),
    });
    const { id, ...rest } = newUserEntity;

    const newMongoUser = await UserModel.create({
      _id: mongoId,
      ...rest,
    });
    await newMongoUser.save();

    return newUserEntity;
  };

  public login = async ({
    email,
    password,
  }: LoginUserDto): Promise<UserEntity> => {
    const user = await UserModel.findOne({ email });
    const passwordMatches = compareSync(password, user!.password);
    if (!passwordMatches || !user) throw CustomError.forbidden("Login denied");
    return UserEntity.createFromMongoObject(user);
  };
}
