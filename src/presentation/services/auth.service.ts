import { UserModel } from "../../data/mongo/models/user.model";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom-error";
import { UserRepository } from "../../domain/repositories/user.repository";
import { EmailService } from "./email.service";
import { JwtGenerator } from "./jwt-generator.service";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  private getToken = async (id: string) => {
    const token = await JwtGenerator.generate({ id });
    if (!token)
      throw CustomError.internalServer("Token not generated. Check logs...");
    return token;
  };

  public registerUser = async (body: Record<string, any>) => {
    const registerUserDto = RegisterUserDto.create(body);

    const isEmailAlreadyUsed = await this.userRepository.isEmailAlreadyUsed(
      registerUserDto.email,
    );
    if (isEmailAlreadyUsed)
      throw CustomError.badRequest("Email already registered.");

    const newUser = await this.userRepository.registerUser(registerUserDto);
    const { password, ...rest } = newUser;

    const token = await this.getToken(rest.id);
    return { user: rest, token };
  };

  public login = async (body: Record<string, any>) => {
    if (!body)
      throw CustomError.badRequest(
        "At least one property is required. Empty object recieved",
      );

    const loginuserDto = LoginUserDto.create(body);

    const isEmailAlreadyUsed = await this.userRepository.isEmailAlreadyUsed(
      loginuserDto.email,
    );

    if (!isEmailAlreadyUsed)
      throw CustomError.notFound(`Email not linked to an account.`);
    const { password, ...rest } = await this.userRepository.login(loginuserDto);

    const token = await JwtGenerator.generate({ id: rest.id });

    return {
      user: rest,
      token,
    };
  };

  public validateUser = async () => {
    await this.emailService.sendEmail({
      to: "daniel.martinez5659@alumnos.udg.mx",
      subject: "test user store",
      text: "hi from user store proyect",
      html: "",
      token: "BAC123",
    });
  };
}
