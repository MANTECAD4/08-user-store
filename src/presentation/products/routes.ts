import { Router } from "express";
import { ProductsController } from "./controller";
import { AuthMiddlewares } from "../auth/middlewares";
import { JwtGenerator } from "../../infraestructure/services/jwt-generator.service";
import { envs } from "../../utils/config/envs";

export class ProductsRoutes {
  static get routes(): Router {
    const { JWT_SEED: seed } = envs();
    const router = Router();

    const tokenGenerator = new JwtGenerator(seed);
    const authMiddleware = new AuthMiddlewares(tokenGenerator);

    const productsController = new ProductsController();
    router.get("/", productsController.getProducts);
    router.post(
      "/",
      authMiddleware.validateJwtToken,
      productsController.createProduct,
    );
    return router;
  }
}
