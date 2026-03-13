import { Router } from "express";
import { ProductsController } from "./controller";
import { AuthMiddlewares } from "../auth/middlewares";
import { JwtGenerator } from "../../infraestructure/services/jwt-generator.service";
import { envs } from "../../utils/config/envs";
import { CreateProductUseCase } from "../../application/use-cases/product/create-product.use-case";
import { ProductRepositoryImpl } from "../../infraestructure/repositories/product.repository.impl";
import { MongoProductDatasource } from "../../infraestructure/datasources/mongo-product.datasource";
import { GetProductsUseCase } from "../../application/use-cases/product/get-products.use-case";

export class ProductsRoutes {
  static get routes(): Router {
    const { JWT_SEED: seed } = envs();
    const router = Router();

    const tokenGenerator = new JwtGenerator(seed);
    const authMiddleware = new AuthMiddlewares(tokenGenerator);

    const productDatasource = new MongoProductDatasource();
    const productRepository = new ProductRepositoryImpl(productDatasource);

    const createProductUseCase = new CreateProductUseCase(productRepository);
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const productsController = new ProductsController(
      getProductsUseCase,
      createProductUseCase,
    );
    router.get("/", productsController.getProducts);
    router.post(
      "/",
      authMiddleware.validateJwtToken,
      productsController.createProduct,
    );
    return router;
  }
}
