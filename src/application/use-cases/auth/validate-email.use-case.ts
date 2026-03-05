import { CustomError } from "../../../domain/errors/custom-error";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { TokenGenerator } from "../../../domain/services/token-generator.service";

export class ValidateEmailUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenGenerator: TokenGenerator,
  ) {}
  execute = async (token: string) => {
    const payload = await this.tokenGenerator.validate(token);
    if (!payload)
      throw CustomError.internalServer(
        "Payload not found (check source of token generation)",
      );
    // if (!regularExpressions().emails.test(decodedPayload))
    //   throw CustomError.internalServer("Recieved email is not valid.");
    return await this.userRepository.validateEmail(payload.sub);
  };
}
