import { UserModel } from "../../data/mongo/models/user.model";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom-error";

export class AuthService {
  public registerUser = async (body: Record<string, any>) => {
    const registerUserDto = RegisterUserDto.create(body);

    const matchEmailUser = await UserModel.findOne({
      email: registerUserDto.email,
    });
    if (matchEmailUser)
      throw CustomError.badRequest("Email already registered.");

    const newMongoUser = await UserModel.create({
      name: registerUserDto.name,
      email: registerUserDto.email,
      password: registerUserDto.password,
    });
    await newMongoUser.save();
    const { password, ...rest } = UserEntity.fromObject(newMongoUser);
    return { user: rest, token: "ABC123" };
  };
}
