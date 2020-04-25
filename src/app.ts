import path from "path";
import express from "express";
import expressPino from "express-pino-logger";

import { IndexRouter } from "./routers/index_router";

export function start() {
  const app = express();
  app.use(expressPino());
  app.use("/public", express.static(path.join(".", "public")));
  app.use("", IndexRouter.create());
  app.listen(8080);
}
