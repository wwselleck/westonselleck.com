import fs from "fs";
import util from "util";
import express from "express";
import * as React from "react";
import { renderReactComponent } from "../lib/renderReactComponent";
import { Index } from "../components/Index";

export class IndexRouter {
  static create() {
    const router = express.Router();
    router.get("/", async (_, res) => {
      const projects = JSON.parse(
        await util.promisify(fs.readFile)("./data/projects.json", "utf-8")
      );
      res.header("Content-Type", "text/html");
      res.send(renderReactComponent(<Index projects={projects} />));
    });
    return router;
  }
}
