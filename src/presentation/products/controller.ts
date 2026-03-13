import { Request, Response } from "express";
import { CreateProductUseCase } from "../../application/use-cases/product/create-product.use-case";
import { CustomError } from "../../domain/errors/custom-error";
import { GetProductsUseCase } from "../../application/use-cases/product/get-products.use-case";

export class ProductsController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
  ) {}

  public getProducts = (req: Request, res: Response) => {
    return this.getProductsUseCase
      .execute(req.query)
      .then((result) => res.json(result))
      .catch((error) => CustomError.handleError(error, res));
  };

  public createProduct = (req: Request, res: Response) => {
    return this.createProductUseCase
      .exectute(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => CustomError.handleError(error, res));
  };
}
