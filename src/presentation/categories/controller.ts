import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom-error";

export class CategoriesController {
  public getCategories = (req: Request, res: Response) => {
    return res.json("Get Categories");
  };
  public createCategories = (req: Request, res: Response) => {
    return res.json("Create Category");
  };
}
