import { CreateUserOptions } from "../datasources/user.datasource";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract isEmailAlreadyUsed: (email: string) => Promise<boolean>;
  abstract createUser: (options: CreateUserOptions) => Promise<UserEntity>;
}
