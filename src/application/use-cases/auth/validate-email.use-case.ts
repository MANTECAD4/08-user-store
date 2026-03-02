import { CustomError } from "../../../domain/errors/custom-error";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { TokenGenerator } from "../../../domain/services/token-generator.service";
import { JwtGenerator } from "../../../presentation/services/jwt-generator.service";

export class ValidateEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenGenerator: TokenGenerator,
  ) {}
  execute = async (token: string) => {
    const { email } = await this.tokenGenerator.validate(token);
    if (!email)
      throw CustomError.internalServer(
        "Email not found in payload (check source of token generation)",
      );
    // if (!regularExpressions().emails.test(decodedPayload))
    //   throw CustomError.internalServer("Recieved email is not valid.");
    return await this.userRepository.validateEmail(email);
  };
}
