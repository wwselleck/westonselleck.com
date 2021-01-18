import express from "express";
import * as React from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { Config } from "../config";

interface GamesRouterArgs {
  config: Config;
}

export class GamesRouter {
  static create({ config }: GamesRouterArgs) {
    const router = express.Router();
    router.get("/", async (_, res) => {
      const doc = new GoogleSpreadsheet(
        "14bqxCN1DsyoGPGfACTSikgi1KxGffIUKrA11J3iT44Y"
      );
      await doc.useServiceAccountAuth({
        client_email: config.google.serviceAccount.email,
        private_key: config.google.serviceAccount.privateKey,
      });
      const sheet = doc.sheetsByIndex[0];
      console.log(sheet.title);

      res.header("Content-Type", "text/html");
      res.send("");
    });
    return router;
  }
}
