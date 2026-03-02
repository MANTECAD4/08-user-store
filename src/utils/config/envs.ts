import "dotenv/config";
import { get } from "env-var";

export const envs = () => ({
  PORT: get("PORT").required().asPortNumber(),
  MONGO_DB: get("MONGO_DB").required().asString(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_USER: get("MONGO_USER").required().asString(),
  MONGO_PASSWORD: get("MONGO_PASSWORD").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),

  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  CLIENT_ID: get("CLIENT_ID").required().asString(),
  CLIENT_SECRET: get("CLIENT_SECRET").required().asString(),
  REDIRECT_URI: get("REDIRECT_URI").required().asString(),
  REFRESH_TOKEN: get("REFRESH_TOKEN").required().asString(),

  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
});
