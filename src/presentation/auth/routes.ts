import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { MongoDatasource } from "../../infraestructure/datasources/mongo-db.datasource";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user.repository.impl";
import { EmailService } from "../services/email.service";
import { envs } from "../../utils/config/envs";

export class AuthRoutes {
  static get routes(): Router {
    const {
      CLIENT_ID: clientId,
      CLIENT_SECRET: clientSecret,
      MAILER_EMAIL: mailerEmail,
      REDIRECT_URI: redirectUri,
      REFRESH_TOKEN: refreshToken,
    } = envs();
    const router = Router();
    const mongoUserDatasource = new MongoDatasource();
    const userRepository = new UserRepositoryImpl(mongoUserDatasource);
    const emailService = new EmailService({
      clientId,
      clientSecret,
      mailerEmail,
      refreshToken,
    });
    const authService = new AuthService(userRepository, emailService);
    const authController = new AuthController(authService);

    router.post("/login", authController.loginUser);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);

    return router;
  }
}
