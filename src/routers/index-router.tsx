import express from "express";
import * as React from "react";
import { renderHomePage } from "../templates/home-template";
import { IndexPage } from "../components/pages/index";
import * as Github from "../services/github";
import { Config } from "../config";
import { Data } from "../services/data";

interface IndexRouterArgs {
  config: Config;
  data: Data;
}

export class IndexRouter {
  static create({ data: { projects, links }, config }: IndexRouterArgs) {
    const router = express.Router();
    router.get("/", async (_, res) => {
      const commit = await Github.getMostRecentCommit(
        config.github.username,
        config.github.token
      );
      res.header("Content-Type", "text/html");
      res.send(
        renderHomePage(
          <IndexPage projects={projects} links={links} commit={commit} />
        )
      );
    });
    return router;
  }
}
