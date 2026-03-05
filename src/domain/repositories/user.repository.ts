import { LoginUserDto, RegisterUserDto } from "../../application/dtos";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract getUserByEmail: (email: string) => Promise<UserEntity | null>;
  abstract getUserById: (id: string) => Promise<UserEntity | null>;
  abstract registerUser: (
    registerUserDto: RegisterUserDto,
  ) => Promise<UserEntity>;
  abstract login: (loginUserDto: LoginUserDto) => Promise<UserEntity>;
  abstract validateEmail: (email: string) => Promise<void>;
}
