import React from "react";
import { graphql, Link } from 'gatsby';

import { RootLayout } from "../layouts/root-layout";

import styles from "./index.module.css";
import effects from "../theme/effects.module.css";
import { Header } from "../components/typography";

const Name = () => <Header size="large">Weston Selleck</Header>;

const Subheader = () => (
  <Header size="small">Software Developer at Atlassian</Header>
);

const IndexSection = ({ children }) => (
  <div className={styles.indexSection}>{children}</div>
);

const IndexSectionHeader = ({ children }) => (
  <Header size="x-small">{children}</Header>
);

const Project = ({ link, title, description }) => (
  <div>
    <a href={link} style={{ "text-shadow": "none" }}>
      {title}
    </a>{" "}
    - {description}
  </div>
);

export default class extends React.Component {
  componentDidMount() {
    document.body.className = effects.colorchange;
  }

  componentDidUnmount() {
    document.body.className = "";
  }
  render() {
    let { data } = this.props;
    return (
      <RootLayout>
        <div className={styles.indexWrapper}>
          <Name />
          <Subheader />

          <IndexSection>
            <IndexSectionHeader>Internet Places to Find Me</IndexSectionHeader>
            <div>
              <a href="https://twitter.com/bbbbbbbbbunnies">Twitter</a>
            </div>
          </IndexSection>

          <IndexSection>
            <IndexSectionHeader>Projects</IndexSectionHeader>
            <Project
              link="https://github.com/wwselleck/it-could-be-trivia"
              title="it-could-be-trivia"
              description="A chat bot for playing trivia"
            />
            <Project
              link="https://github.com/wwselleck/bolt-interactive"
              title="bolt-interactive"
              description="An interactive CLI for managing your bolt projects"
            />
            <Project
              link="https://github.com/wwselleck/DriveCMS"
              title="DriveCMS"
              description="Use Google Drive as a simple CMS for your website"
            />
          </IndexSection>

          <IndexSection>
            <IndexSectionHeader>Bug Notes</IndexSectionHeader>
            <div>
              {data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.tags.includes('bug-notes')).map(({ node }) => (
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              ))}
            </div>
          </IndexSection>

          <IndexSection>
            <IndexSectionHeader>Misc.</IndexSectionHeader>
            <div>
              <a href="https://docs.google.com/spreadsheets/d/1YAlCh6L0o0rLPLToGFb5x9du7NYFuplulTqX8ZKp3cs/edit?usp=sharing">
                My spreadsheet of music ratings
              </a>
            </div>
          </IndexSection>
        </div>
      </RootLayout>
    );
  }
}


export const query = graphql`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
`
