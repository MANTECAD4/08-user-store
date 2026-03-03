import { Router } from "express";
import { AuthController } from "./controller";
import { MongoDatasource } from "../../infraestructure/datasources/mongo-db.datasource";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user.repository.impl";
import { NodemailerService } from "../../infraestructure/services/nodemailer.service";
import { envs } from "../../utils/config/envs";
import { BcryptHasher } from "../../infraestructure/services/bcrypt.service";
import {
  LoginUseCase,
  RegisterUserUseCase,
  ValidateEmailUseCase,
} from "../../application/use-cases";
import { JwtGenerator } from "../../infraestructure/services/jwt-generator.service";

export class AuthRoutes {
  static get routes(): Router {
    const {
      CLIENT_ID: clientId,
      CLIENT_SECRET: clientSecret,
      MAILER_EMAIL: mailerEmail,
      REDIRECT_URI: redirectUri,
      REFRESH_TOKEN: refreshToken,
      JWT_SEED: seed,
      WEBSERVICE_URL: webServiceUrl,
    } = envs();

    const router = Router();

    // ! SERVICES
    const hasherService = new BcryptHasher(10);
    const tokenGenerator = new JwtGenerator(seed);
    const emailService = new NodemailerService({
      clientId,
      clientSecret,
      mailerEmail,
      refreshToken,
    });

    //! DATASOURCE & REPOSITORY
    const mongoUserDatasource = new MongoDatasource(hasherService);
    const userRepository = new UserRepositoryImpl(mongoUserDatasource);
    // const authService = new AuthService(userRepository, emailService);

    // ! USE CASES
    const registerUserUseCase = new RegisterUserUseCase(
      userRepository,
      emailService,
      tokenGenerator,
    );
    const loginUseCase = new LoginUseCase(userRepository, tokenGenerator);
    const validateEmailUseCase = new ValidateEmailUseCase(
      userRepository,
      tokenGenerator,
    );

    const authController = new AuthController(
      registerUserUseCase,
      loginUseCase,
      validateEmailUseCase,
      webServiceUrl,
    );

    router.post("/login", authController.loginUser);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);

    return router;
  }
}
