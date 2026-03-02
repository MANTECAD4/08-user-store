export abstract class TokenGenerator {
  abstract generate: (payload: any, duration?: number) => Promise<unknown>;
  abstract validate: (token: string) => Promise<any>;
}
