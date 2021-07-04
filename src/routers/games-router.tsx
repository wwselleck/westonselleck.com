import express from "express";
import * as React from "react";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { renderSecondaryPage } from "../templates/secondary-template";
import { Config } from "../config";
import { GamesPage } from "../components/GamesPage";

interface Game {
  name: string;
  platform: string;
  rating: number;
  added?: Date | null;
}

class GamesSheet {
  constructor(private sheet: GoogleSpreadsheetWorksheet) {}

  async getGames(): Promise<Game[]> {
    const rows = await this.sheet.getRows();
    return rows
      .filter((r) => r.Rating)
      .map((r) => {
        return {
          name: r.Title,
          platform: r.Platform,
          rating: Number(r.Rating),
          added: r.Added && new Date(r.Added),
        };
      });
  }
}

interface GamesRouterArgs {
  config: Config;
}

export class GamesRouter {
  static async create({ config }: GamesRouterArgs) {
    const router = express.Router();
    const doc = new GoogleSpreadsheet(config.games.sheetId);
    await doc.useServiceAccountAuth({
      client_email: config.google.serviceAccount.email,
      private_key: config.google.serviceAccount.privateKey,
    });
    await doc.loadInfo();
    const gamesSheet = new GamesSheet(doc.sheetsByIndex[0]);
    router.get("/", async (_, res) => {
      const games = await gamesSheet.getGames();

      res.header("Content-Type", "text/html");
      res.send(renderSecondaryPage(<GamesPage games={games} />));
    });
    return router;
  }
}
