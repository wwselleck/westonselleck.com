import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

export interface Config {
  github: {
    username: string;
    token: string;
  };
  google: {
    serviceAccount: {
      email: string;
      privateKey: string;
    };
  };
  games: {
    sheetId: string;
  };
}

export const load = async () => {
  return {
    github: {
      username: process.env.GITHUB_USERNAME,
      token: process.env.GITHUB_TOKEN,
    },
    google: {
      serviceAccount: {
        email: process.env.GOOGLE_SERVICE_EMAIL,
        privateKey: process.env.GOOGLE_SERVICE_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ),
      },
    },
    games: {
      sheetId: process.env.GAMES_SHEET_ID,
    },
  };
};
