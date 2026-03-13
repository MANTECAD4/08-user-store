import { Request, Response } from "express";
import { CreateProductUseCase } from "../../application/use-cases/product/create-product.use-case";
import { CustomError } from "../../domain/errors/custom-error";

export class ProductsController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  public getProducts = (req: Request, res: Response) => {
    return res.json("Get products");
  };

  public createProduct = (req: Request, res: Response) => {
    return this.createProductUseCase
      .exectute(req.body)
      .then((result) => res.status(201).json(result))
      .catch((error) => CustomError.handleError(error, res));
  };
}
