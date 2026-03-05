import { NextFunction, Request, Response } from "express";
import { TokenGenerator } from "../../domain/services";
import { CustomError } from "../../domain/errors/custom-error";

export class AuthMiddlewares {
  constructor(private readonly tokenGenerator: TokenGenerator) {}
  public validateJwtToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authorization = req.header("authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid bearer token" });

    const token = authorization.split(" ").at(1) ?? "";

    try {
      const payload = await this.tokenGenerator.validate(token);
      if (!payload) return res.status(401).json({ error: "Invalid token." });
      req.body["auth-token-payload"] = payload;
      console.log(req.body);
      next();
    } catch (error) {
      console.log("enter here");
      return CustomError.handleError(error, res);
    }
  };
}
