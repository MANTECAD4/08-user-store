import { Router } from "express";
import { CategoriesController } from "./controller";
import { AuthMiddlewares } from "../auth/middlewares";
import { JwtGenerator } from "../../infraestructure/services/jwt-generator.service";
import { envs } from "../../utils/config/envs";

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();

    const { JWT_SEED: seed } = envs();

    const tokenGenerator = new JwtGenerator(seed);
    const authMiddleware = new AuthMiddlewares(tokenGenerator);

    const categoriesController = new CategoriesController();

    router.get("/", categoriesController.getCategories);
    router.post(
      "/",
      authMiddleware.validateJwtToken,
      categoriesController.createCategories,
    );

    return router;
  }
}
