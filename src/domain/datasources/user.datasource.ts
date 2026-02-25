import { UserEntity } from "../entities/user.entity";

export interface CreateUserOptions {
  name: string;
  email: string;
  password: string;
}
export abstract class UserDatasource {
  abstract isEmailAlreadyUsed: (email: string) => Promise<boolean>;
  abstract createUser: (options: CreateUserOptions) => Promise<UserEntity>;
}
