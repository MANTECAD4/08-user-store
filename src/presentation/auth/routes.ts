import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { MongoDatasource } from "../../infraestructure/datasources/mongo-db.datasource";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user.repository.impl";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const mongoUserDatasource = new MongoDatasource();
    const userRepository = new UserRepositoryImpl(mongoUserDatasource);
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    router.post("/login", authController.loginUser);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);

    return router;
  }
}
