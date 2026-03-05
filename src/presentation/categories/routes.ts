import { Router } from "express";
import { CategoriesController } from "./controller";
import { AuthMiddlewares } from "../auth/middlewares";
import { JwtGenerator } from "../../infraestructure/services/jwt-generator.service";
import { envs } from "../../utils/config/envs";
import { MongoCategoryDatasource } from "../../infraestructure/datasources/mongo-category.datasource";
import { CategoryRepositoryImpl } from "../../infraestructure/repositories/category.repository.impl";
import { CreateCategoryUseCase } from "../../application/use-cases/category/create-category.use-case";
import { GetCategoriesUseCase } from "../../application/use-cases/category/get-categories.use-case";

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();

    const { JWT_SEED: seed } = envs();

    const tokenGenerator = new JwtGenerator(seed);
    const authMiddleware = new AuthMiddlewares(tokenGenerator);

    const categoryDatasource = new MongoCategoryDatasource();
    const categoryRepository = new CategoryRepositoryImpl(categoryDatasource);

    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
    const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
    const categoriesController = new CategoriesController(
      createCategoryUseCase,
      getCategoriesUseCase,
    );

    router.get("/", categoriesController.getCategories);
    router.post(
      "/",
      authMiddleware.validateJwtToken,
      categoriesController.createCategories,
    );

    return router;
  }
}
