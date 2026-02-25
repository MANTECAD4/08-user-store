import { UserModel } from "../../data/mongo/models/user.model";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom-error";
import { UserRepository } from "../../domain/repositories/user.repository";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  public registerUser = async (body: Record<string, any>) => {
    const registerUserDto = RegisterUserDto.create(body);

    const isEmailAlreadyUsed = await this.userRepository.isEmailAlreadyUsed(
      registerUserDto.email,
    );
    if (isEmailAlreadyUsed)
      throw CustomError.badRequest("Email already registered.");

    const newUser = await this.userRepository.createUser(registerUserDto);
    const { password, ...rest } = newUser;
    return { user: rest, token: "ABC123" };
  };
}
