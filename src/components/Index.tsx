import * as React from "react";

import * as Dates from "../lib/date";

import { IndexSection } from "./IndexSection";
import { Header } from "./Header";

interface IndexProps {
  links: Array<{ text: string; href: string, iconUrl?: string }>;
  projects: Array<{
    link: string;
    title: string;
    description: string;
    emoji: string;
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
      <div className="indexMainColumn">
        <div className="indexMainContent">
          <div className="mePic">
            <div className="mePicBackground"></div>
          </div>
          <div>
            <p className="indexMainText">
              Hi, I'm <b>Weston Selleck</b>. I'm a software developer
              currently working at <b>Atlassian</b> on Trello. Please enjoy this complimentary <span id="dragItemName">lollipop</span> during your stay on my website <span id="dragItem"></span>.
            </p>
            <div className="indexLinks">
              {links.map(link => {
                return <span>
                  {link.iconUrl && <img src={link.iconUrl} />}
                  <a href={link.href}>{link.text}</a>
                </span>
              })}
            </div>
          </div>
        </div>
        <div className="smallColumn">
          <ProjectsSection projects={projects}/>
        </div>
      </div>
    </div>
  );
};

interface SectionHeaderProps {
  color: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({children, color}) => {
  return <div className="indexSectionHeader">
    <div className={`indexSectionHeaderSquare ${color}`} />
    {children}
  </div>
}

interface ProjectsSectionProps {
  projects: IndexProps['projects'];
}
const ProjectsSection: React.FC<ProjectsSectionProps> = ({projects}) => {
  return <div>
    <SectionHeader color="purple">Projects</SectionHeader>
    {projects.map(project => <div className="indexProject">
      <div>
        {project.emoji}
        <a href={project.link}>{project.title}</a>
      </div>
      <p>{project.description}</p>
    </div>)}
  </div>

}

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
