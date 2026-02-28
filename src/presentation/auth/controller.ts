import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom-error";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { AuthService } from "../services/auth.service";

export class AuthController {
  // DI
  constructor(public readonly authService: AuthService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal server error. Check logs" });
  };

  register = (req: Request, res: Response) => {
    const { body } = req;

    this.authService
      .registerUser(body)
      .then((result) => res.status(201).json(result))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const { body } = req;
    this.authService
      .login(body)
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };

  validateEmail = (req: Request, res: Response) => {
    const { body } = req;
    this.authService
      .validateUser()
      .then((result) => res.json(result))
      .catch((error) => this.handleError(error, res));
  };
}
