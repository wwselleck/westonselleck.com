import * as React from "react";

import * as Dates from "../../../lib/date";
import { Section } from './IndexSection';

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

export const IndexPage = ({ projects, links, commit }: IndexProps) => {
  return (
    <div className="indexWrapper">
      <div className="mainColumn">
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
          <Section color="blue" name="Other stuff">
            <a href="./games">All of the games I've played</a>
          </Section>
          <div className="indexFooter">
          <MostRecentCommit commit={commit}/>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectsSectionProps {
  projects: IndexProps['projects'];
}
const ProjectsSection: React.FC<ProjectsSectionProps> = ({projects}) => {
  return <Section color="pink" name="Projects">
    {projects.map(project => <div className="indexProject">
      <div>
        {project.emoji}
        <a href={project.link}>{project.title}</a>
      </div>
      <p>{project.description}</p>
    </div>)}
  </Section>

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
      <img src="./public/Git-Icon-Black.png" />
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
