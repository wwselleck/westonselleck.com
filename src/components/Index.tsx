import * as React from "react";

import * as Dates from "../lib/date";

import { IndexSection } from "./IndexSection";
import { Header } from "./Header";

interface IndexProps {
  links: Array<{ text: string; href: string }>;
  projects: Array<{
    link: string;
    title: string;
    description: string;
  }>;
  commit?: {
    link: string;
    repo: {
      name: string;
      link: string;
    };
    message: string;
    date: Date;
  };
}

export const Index = ({ projects, links, commit }: IndexProps) => {
  return (
    <div className="indexWrapper">
      <Header />
      {commit && <MostRecentCommit commit={commit} />}

      <IndexSection>
        <div className="header xsmall">Internet Places to Find Me</div>
        {links.map((l) => (
          <div>
            <a href={l.href}>{l.text}</a>
          </div>
        ))}
      </IndexSection>

      <IndexSection>
        <div className="header xsmall">Projects</div>
        {projects.map((project) => (
          <div>
            <a href={project.link}>{project.title}</a> - {project.description}
          </div>
        ))}
      </IndexSection>

      <IndexSection>
        <div className="header xsmall">Misc</div>
        <a href="https://docs.google.com/spreadsheets/d/1YAlCh6L0o0rLPLToGFb5x9du7NYFuplulTqX8ZKp3cs/edit?usp=sharing">
          My spreadsheet of music ratings
        </a>
        <div>
          <a href="/games">Every game I've played</a>
        </div>
      </IndexSection>
    </div>
  );
};

export const MostRecentCommit = ({
  commit,
}: {
  commit: IndexProps["commit"];
}) => {
  const possibleDateColors = ["#f2a100", "#db2500", "#ba02db", "#00cf87"];
  const dateColor =
    possibleDateColors[
      Math.floor(Math.random() * Math.floor(possibleDateColors.length))
    ];

  return (
    <div className="mostRecentCommit">
      <img src="./public/Git-Icon-White.png" />
      <p className="repo">
        <a target="_blank" href={commit.repo.link}>
          {commit.repo.name}
        </a>
      </p>
      <p className="message">
        <a target="_blank" href={commit.link}>
          {commit.message}
        </a>
      </p>
      <p className="date" style={{ color: dateColor }}>
        {Dates.timeSince(commit.date)}
      </p>
    </div>
  );
};
