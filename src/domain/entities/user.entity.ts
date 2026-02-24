import { CustomError } from "../errors/custom-error";

export interface UserEntityOptions {
  id: string;
  name: string;
  email: string;
  isEmailValidated: boolean;
  password: string;
  role: string[];
  img: string;
}

export class UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public isEmailValidated: boolean;
  public password: string;
  public role: string[];
  public img?: string;

  constructor(options: UserEntityOptions) {
    const { id, name, email, isEmailValidated, password, role, img } = options;
    this.id = id;
    this.name = name;
    this.email = email;
    this.isEmailValidated = isEmailValidated;
    this.password = password;
    this.role = role;
    this.img = img;
  }

  public static fromObject = (object: Record<string, any>): UserEntity => {
    const { _id, id, name, email, isEmailValidated, password, role, img } =
      object;
    if (!_id && !id) throw CustomError.badRequest("Id field is required.");
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
