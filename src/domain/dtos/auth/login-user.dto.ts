import { regularExpressions } from "../../../utils/helpers/regular-exp.helper";
import { CustomError } from "../../errors/custom-error";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create = (body: Record<string, any>) => {
    const { email, password } = body;

    if (!email) throw CustomError.badRequest("An email is required");
    if (!regularExpressions().emails.test(email))
      throw CustomError.badRequest("Invalid email");
    if (!password) throw CustomError.badRequest("A password is required");

    return new LoginUserDto(email, password);
  };
}
