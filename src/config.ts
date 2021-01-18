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
}

export const load = async () => {
  const googleServiceAccount = JSON.parse(
    await readFile("~/weston-dev-9ba2c51bed1a.json", "utf-8")
  );
  return {
    github: {
      username: process.env.GITHUB_USERNAME,
      token: process.env.GITHUB_TOKEN,
    },
    google: {
      serviceAccount: {
        email: googleServiceAccount.client_email,
        privateKey: googleServiceAccount.private_key,
      },
    },
  };
};
