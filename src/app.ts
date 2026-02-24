import { envs } from "./utils/config/envs";
import { MongoDatabase } from "./data/mongo/mongo-database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  const { MONGO_URL: mongoUrl, MONGO_DB: dbName } = envs();

  await MongoDatabase.connect({ mongoUrl, dbName });
  const server = new Server({
    port: envs().PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
