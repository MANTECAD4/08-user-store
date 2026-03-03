import { compareSync, hashSync } from "bcryptjs";
import { HasherService } from "../../domain/services/hasher.service";

export class BcryptHasher implements HasherService {
  constructor(private readonly salt: number) {}
  public hash = (inputText: string): string => {
    return hashSync(inputText, this.salt);
  };
  public compare = (inputText: string, hashed: string): boolean => {
    return compareSync(inputText, hashed);
  };
}
