import { Router } from "express";
import { CategoriesController } from "./controller";

export class CategoriesRoutes {
  static get routes(): Router {
    const router = Router();

    const categoriesController = new CategoriesController();

    router.get("/", categoriesController.getCategories);
    router.post("/", categoriesController.createCategories);

    return router;
  }
}
