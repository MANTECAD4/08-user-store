import { CustomError } from "../../../domain/errors/custom-error";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { TokenGenerator } from "../../../domain/services/token-generator.service";
import { RegisterUserDto } from "../../dtos";
import { EmailService } from "../../../domain/services/email.service";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  private sendEmailValidation = async (
    email: string,
    webServiceUrl: string,
  ) => {
    try {
      const token = await this.tokenGenerator.generate({ email });
      const link = `${webServiceUrl}/auth/validate-email/${token}`;
      await this.emailService.sendEmail({
        to: email,
        subject: "Help us validating your email!",
        text: "Validate your email ✉",
        html: `
          <h1>Validate your email</h1>
          <p>Click on the link below to verify your account.</p>
          <p>Ignore this message if it wasn't you.</p>
          <a href="${link}">Validate your email</a>`,
      });
    } catch (error) {
      throw CustomError.internalServer(
        "Someting went wrong while sending verification email",
      );
    }
  };

  execute = async (body: Record<string, any>, webServiceLink: string) => {
    const registerUserDto = RegisterUserDto.create(body);

    const isEmailAlreadyUsed = await this.userRepository.isEmailAlreadyUsed(
      registerUserDto.email,
    );
    if (isEmailAlreadyUsed)
      throw CustomError.badRequest("Email already registered.");

    const newUser = await this.userRepository.registerUser(registerUserDto);
    const { password, ...rest } = newUser;

    const token = await this.tokenGenerator.generate({ id: rest.id });

    await this.sendEmailValidation(rest.email, webServiceLink);

    return { user: rest, token };
  };
}
