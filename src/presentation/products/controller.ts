import { Request, Response } from "express";

export class ProductsController {
  constructor() {}

  public getProducts = (req: Request, res: Response) => {
    return res.json("Get products");
  };

  public createProduct = () => {};
}
