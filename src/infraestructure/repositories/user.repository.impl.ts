import {
  CreateUserOptions,
  UserDatasource,
} from "../../domain/datasources/user.datasource";
import { UserEntity } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}
  public isEmailAlreadyUsed = async (email: string): Promise<boolean> => {
    return this.userDatasource.isEmailAlreadyUsed(email);
  };
  public createUser = async (
    options: CreateUserOptions,
  ): Promise<UserEntity> => {
    return this.userDatasource.createUser(options);
  };
}
