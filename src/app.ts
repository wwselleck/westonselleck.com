import path from "path";
import express from "express";
import expressPino from "express-pino-logger";

import * as Data from "./services/data";
import * as Config from "./config";
import { IndexRouter } from "./routers/index-router";
import { GamesRouter } from "./routers/games-router";

export async function start() {
  const data = await Data.load();
  const config = await Config.load();

  const app = express();
  app.use(expressPino());
  app.use("/public", express.static(path.join(".", "public")));
  app.use("", IndexRouter.create({ data, config }));
  app.use("/games", await GamesRouter.create({ config }));
  app.listen(8080);
  console.log("Running on port 8080");
}
