import { LoginUserDto } from "../../application/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../application/dtos/auth/register-user.dto";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}
  public isEmailAlreadyUsed = async (email: string): Promise<boolean> => {
    return this.userDatasource.isEmailAlreadyUsed(email);
  };
  public registerUser = async (
    registerUsserDto: RegisterUserDto,
  ): Promise<UserEntity> => {
    return this.userDatasource.registerUser(registerUsserDto);
  };
  public login = (loginUserDto: LoginUserDto) => {
    return this.userDatasource.login(loginUserDto);
  };
  public validateEmail = async (email: string) => {
    return this.userDatasource.validateEmail(email);
  };
}
