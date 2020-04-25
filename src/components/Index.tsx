import * as React from "react";

import { IndexSection } from "./IndexSection";

interface IndexProps {
  projects: Array<{
    link: string;
    title: string;
    description: string;
  }>;
}

export const Index = ({ projects }: IndexProps) => {
  return (
    <div className="indexWrapper">
      <div className="header large">Weston Selleck</div>
      <div className="header small">Software Developer at Atlassian</div>

      <IndexSection>
        <div className="header xsmall">Internet Places to Find Me</div>
        <div>
          <a href="https://twitter.com/bbbbbbbbbunnies">Twitter</a>
        </div>
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
      </IndexSection>
    </div>
  );
};
