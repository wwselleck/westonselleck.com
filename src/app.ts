import path from "path";
import express from "express";
import expressPino from "express-pino-logger";

import * as Data from "./services/data";
import { IndexRouter } from "./routers/index_router";

export async function start() {
  const data = await Data.load();

  const app = express();
  app.use(expressPino());
  app.use("/public", express.static(path.join(".", "public")));
  app.use("", IndexRouter.create(data));
  app.listen(8080);
}
