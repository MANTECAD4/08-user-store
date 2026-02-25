import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract isEmailAlreadyUsed: (email: string) => Promise<boolean>;
  abstract registerUser: (
    registerUserDto: RegisterUserDto,
  ) => Promise<UserEntity>;
}
