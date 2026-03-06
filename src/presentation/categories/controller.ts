import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom-error";
import { CreateCategoryUseCase } from "../../application/use-cases/category/create-category.use-case";
import { GetCategoriesUseCase } from "../../application/use-cases/category/get-categories.use-case";

export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoryiesUseCase: GetCategoriesUseCase,
  ) {}
  public getCategories = (req: Request, res: Response) => {
    return this.getCategoryiesUseCase
      .execute(req.query)
      .then((result) => res.json(result))
      .catch((error) => CustomError.handleError(error, res));
  };

  public createCategories = (req: Request, res: Response) => {
    return this.createCategoryUseCase
      .execute(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => CustomError.handleError(error, res));
  };
}
