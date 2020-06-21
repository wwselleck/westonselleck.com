import { readFile } from "../lib/fs";

export interface Data {
  links: Array<Link>;
  projects: Array<Project>;
}
export interface Link {
  text: string;
  href: string;
}
export interface Project {
  link: string;
  title: string;
  description: string;
}
const dataPath = (fileName: string) => `./data/${fileName}`;

export const readJSON = async (fileName: string) => {
  const contents = await readFile(dataPath(fileName), "utf-8");
  return JSON.parse(contents);
};

export async function load() {
  const [projects, links] = await Promise.all([
    readJSON("projects.json"),
    readJSON("links.json"),
  ]);

  return { projects, links };
}
