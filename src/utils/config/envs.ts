import "dotenv/config";
import { get } from "env-var";

export const envs = () => ({
  PORT: get("PORT").required().asPortNumber(),
  MONGO_DB: get("MONGO_DB").required().asString(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_USER: get("MONGO_USER").required().asString(),
  MONGO_PASSWORD: get("MONGO_PASSWORD").required().asString(),
});
