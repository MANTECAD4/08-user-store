import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom-error";
import {
  LoginUseCase,
  RegisterUserUseCase,
  ValidateEmailUseCase,
} from "../../application/use-cases";
import { envs } from "../../utils/config/envs";
// import { AuthService } from "../services/auth.service";

export class AuthController {
  // DI
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly validateEmailUseCase: ValidateEmailUseCase,
    private readonly webServiceUrl: string,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal server error. Check logs" });
  };

  register = (req: Request, res: Response) => {
    const { body } = req;

    this.registerUserUseCase
      .execute(body, this.webServiceUrl)
      .then((result) => res.status(201).json(result))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const { body } = req;
    this.loginUseCase
      .execute(body)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    if (!token) throw CustomError.badRequest("Missing Jwt Token...");
    this.validateEmailUseCase
      .execute(token)
      .then(() => res.json("Email validated"))
      .catch((error) => this.handleError(error, res));
  };
}
