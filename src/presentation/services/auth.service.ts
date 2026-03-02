// import { LoginUserDto } from "../../application/dtos/auth/login-user.dto";
// import { RegisterUserDto } from "../../application/dtos/auth/register-user.dto";
// import { UserModel } from "../../data/mongo/models/user.model";
// import { UserEntity } from "../../domain/entities/user.entity";
// import { CustomError } from "../../domain/errors/custom-error";
// import { UserRepository } from "../../domain/repositories/user.repository";
// import { envs } from "../../utils/config/envs";
// import { regularExpressions } from "../../utils/helpers/regular-exp.helper";
// import { NodemailerService } from "./nodemailer.service";
// import { JwtGenerator } from "./jwt-generator.service";

// export class AuthService {
//   constructor(
//     private readonly userRepository: UserRepository,
//     private readonly emailService: NodemailerService,
//   ) {}

//   private getToken = async (payload: string) => {
//     const token = await JwtGenerator.generate({ payload });

//     if (!token)
//       throw CustomError.internalServer("Token not generated. Check logs...");
//     return token;
//   };

//   public sendEmailValidation = async (email: string) => {
//     try {
//       const token = await this.getToken(email);
//       const link = `${envs().WEBSERVICE_URL}/auth/validate-email/${token}`;
//       await this.emailService.sendEmail({
//         to: email,
//         subject: "Help us validating your email!",
//         text: "Validate your email ✉",
//         html: `
//         <h1>Validate your email</h1>
//         <p>Click on the link below to verify your account.</p>
//         <p>Ignore this message if it wasn't you.</p>
//         <a href="${link}">Validate your email</a>`,
//       });
//     } catch (error) {
//       throw CustomError.internalServer(
//         "Someting went wrong while sending verification email",
//       );
//     }
//   };

//   public registerUser = async (body: Record<string, any>) => {
//     const registerUserDto = RegisterUserDto.create(body);

//     const isEmailAlreadyUsed = await this.userRepository.isEmailAlreadyUsed(
//       registerUserDto.email,
//     );
//     if (isEmailAlreadyUsed)
//       throw CustomError.badRequest("Email already registered.");

//     const newUser = await this.userRepository.registerUser(registerUserDto);
//     const { password, ...rest } = newUser;

//     const token = await this.getToken(rest.id);

//     await this.sendEmailValidation(rest.email);

//     return { user: rest, token };
//   };

//   public login = async (body: Record<string, any>) => {
//     if (!body)
//       throw CustomError.badRequest(
//         "At least one property is required. Empty object recieved",
//       );

//     const loginuserDto = LoginUserDto.create(body);

//     const isEmailAlreadyUsed = await this.userRepository.isEmailAlreadyUsed(
//       loginuserDto.email,
//     );

//     if (!isEmailAlreadyUsed)
//       throw CustomError.notFound(`Email not linked to an account.`);
//     const { password, ...rest } = await this.userRepository.login(loginuserDto);

//     const token = await JwtGenerator.generate({ id: rest.id });

//     return {
//       user: rest,
//       token,
//     };
//   };

//   public verifyToken = async (token: string) => {
//     const decodedPayload = await JwtGenerator.validate(token);
//     if (!decodedPayload.payload)
//       throw CustomError.internalServer(
//         "Email not found in payload (check source of token generation)",
//       );
//     // if (!regularExpressions().emails.test(decodedPayload))
//     //   throw CustomError.internalServer("Recieved email is not valid.");
//     return await this.userRepository.validateEmail(decodedPayload.payload);
//   };
// }
