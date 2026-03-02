import { RegisterUserDto } from "../../application/dtos";
import { UserRoles } from "../../data/mongo/models/user.model";
import { CustomError } from "../errors/custom-error";

export interface UserEntityOptions {
  id: string;
  name: string;
  email: string;
  isEmailValidated: boolean;
  password: string;
  role: UserRoles[];
  img?: string;
}

export class UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public isEmailValidated: boolean;
  public password: string;
  public role: UserRoles[];
  public img?: string;

  private constructor(options: UserEntityOptions) {
    const { id, name, email, isEmailValidated, password, role, img } = options;
    this.id = id;
    this.name = name;
    this.email = email;
    this.isEmailValidated = isEmailValidated;
    this.password = password;
    this.role = role;
    this.img = img;
  }

  public static createClassic = (
    id: string,
    registerUserDto: RegisterUserDto,
  ) => {
    return new UserEntity({
      id,
      ...registerUserDto,
      isEmailValidated: false,
      role: [UserRoles.USER_ROLE],
    });
  };

  public static createFromMongoObject = (
    object: Record<string, any>,
  ): UserEntity => {
    const { _id, id, name, email, isEmailValidated, password, role, img } =
      object;

    if (_id == null && id == null)
      throw CustomError.badRequest("Id field is required. (from UserEntity)");
    if (!name) throw CustomError.badRequest("Name field is required.");
    if (!email) throw CustomError.badRequest("Email field is required.");
    if (isEmailValidated === undefined)
      throw CustomError.badRequest("isEmailValidated field is required.");
    if (!password) throw CustomError.badRequest("password field is required.");
    if (!role) throw CustomError.badRequest("role field is required.");

    return new UserEntity({
      id: _id || id,
      name,
      email,
      isEmailValidated,
      password,
      role,
      img,
    });
  };
}
