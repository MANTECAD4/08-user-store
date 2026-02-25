import { UserDatasource } from "../../domain/datasources/user.datasource";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
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
}
