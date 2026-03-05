import { LoginUserDto } from "../../application/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../application/dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
  abstract getUserByEmail: (email: string) => Promise<UserEntity | null>;
  abstract getUserById: (id: string) => Promise<UserEntity | null>;
  abstract registerUser: (
    registerUserDto: RegisterUserDto,
  ) => Promise<UserEntity>;
  abstract login: (loginUserDto: LoginUserDto) => Promise<UserEntity>;
  abstract validateEmail: (id: string) => Promise<void>;
}
