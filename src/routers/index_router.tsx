import express from "express";
import * as React from "react";
import { renderReactComponent } from "../lib/renderReactComponent";
import { Index } from "../components/Index";
import * as Github from "../services/github";
import { config } from "../config";
import * as Data from "../services/data";

export class IndexRouter {
  static create({ projects, links }: Data.Data) {
    const router = express.Router();
    router.get("/", async (_, res) => {
      const commit = await Github.getMostRecentCommit(config.github.username);
      res.header("Content-Type", "text/html");
      res.send(
        renderReactComponent(
          <Index projects={projects} links={links} commit={commit} />
        )
      );
    });
    return router;
  }
}
