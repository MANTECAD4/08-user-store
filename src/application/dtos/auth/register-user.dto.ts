import { CustomError } from "../../../domain/errors/custom-error";
import { regularExpressions } from "../../../utils/helpers/regular-exp.helper";

export interface RegisterUserDtoOptions {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserDto {
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;

  private constructor(options: RegisterUserDtoOptions) {
    const { email, name, password } = options;
    this.email = email;
    this.name = name;
    this.password = password;
  }

  public static create = (options: Record<string, any>): RegisterUserDto => {
    const { email, name, password } = options;

    const regularExps = regularExpressions();

    if (!email) throw CustomError.badRequest("Missing email property");
    if (!regularExps["emails"].test(email))
      throw CustomError.badRequest("Invalid email");
    if (!name) throw CustomError.badRequest("Missing name property");
    if (!password) throw CustomError.badRequest("Missing password property");

    return new RegisterUserDto({ email, name, password });
  };
}
