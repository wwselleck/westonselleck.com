import * as Data from "../services/data";

const PROJECTS_FILE_NAME = "projects.json";

export async function load() {
  return Data.readJSON(PROJECTS_FILE_NAME);
}
