import { compareSync, hashSync } from "bcryptjs";

export class PasswordHasher {
  public static hash = (password: string): string => {
    return hashSync(password, 10);
  };
  public static compare = (password: string, hashed: string): boolean => {
    return compareSync(password, hashed);
  };
}
