import jwt from "jsonwebtoken";
import { CustomError } from "../../domain/errors/custom-error";
import {
  TokenGenerator,
  TokenPayload,
} from "../../domain/services/token-generator.service";
export class JwtGenerator implements TokenGenerator {
  constructor(private readonly seed: string) {}

  public generate = async (payload: TokenPayload, duration?: number) => {
    return new Promise((resolve) => {
      jwt.sign(payload, this.seed, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          console.log(err);
          throw CustomError.internalServer(
            "Internal server error (error in jwt generator). Check logs.",
          );
        }
        return resolve(token);
      });
    });
  };

  public validate = (token: string): Promise<TokenPayload | null> => {
    return new Promise((resolve) => {
      jwt.verify(token, this.seed, (err, decoded) => {
        if (err) {
          console.log(err);
          throw CustomError.unauthorized(`Invalid token`);
        }
        return resolve(decoded as TokenPayload);
      });
    });
  };
}
