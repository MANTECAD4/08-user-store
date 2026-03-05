import { CustomError } from "../../../domain/errors/custom-error";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { TokenGenerator } from "../../../domain/services/token-generator.service";
import { LoginUserDto } from "../../dtos";

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenGenerator: TokenGenerator,
  ) {}
  execute = async (body: Record<string, any>) => {
    if (!body)
      throw CustomError.badRequest(
        "At least one property is required. Empty object recieved",
      );

    const loginuserDto = LoginUserDto.create(body);

    const user = await this.userRepository.getUserByEmail(loginuserDto.email);

    if (!user) throw CustomError.notFound(`Email not linked to an account.`);
    const { password, ...rest } = await this.userRepository.login(loginuserDto);

    const token = await this.tokenGenerator.generate({ id: rest.id });

    return {
      user: rest,
      token,
    };
  };
}
