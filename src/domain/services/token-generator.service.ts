import { UserRoles } from "../../data/mongo";

export interface TokenPayload {
  sub: string;
  role?: UserRoles[];
}

export abstract class TokenGenerator {
  abstract generate: (
    payload: TokenPayload,
    duration?: number,
  ) => Promise<unknown>;
  abstract validate: (token: string) => Promise<TokenPayload | null>;
}
