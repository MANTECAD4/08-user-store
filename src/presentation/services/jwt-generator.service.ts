import jwt from "jsonwebtoken";
import { CustomError } from "../../domain/errors/custom-error";
import { envs } from "../../utils/config/envs";
export class JwtGenerator {
  public static generate = async (payload: any, duration: string = "2h") => {
    const { JWT_SEED } = envs();
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          console.log(err);
          throw CustomError.internalServer(
            "Inertnal server error (error in jwt generator). Check logs.",
          );
        }
        return resolve(token);
      });
    });
  };
}
