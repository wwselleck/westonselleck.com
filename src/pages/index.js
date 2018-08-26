import React from "react";
import styles from './index.module.css';

const Project = ({link, title, description}) => (
  <div><a href={link} style={{"text-shadow": 'none'}}>{title}</a> - {description}</div>
)

const IndexSection = ({children}) => (
  <div className={styles.indexSection}>
    {children}
  </div>
);
export default () => (
  <div>
    <div className={styles.name}>
      Weston Selleck
    </div>
    <div className={styles.subheader}>
      Software Developer at Atlassian
    </div>

    <IndexSection>
      <h4>Internet Places to Find Me</h4>
      <div><a href="https://twitter.com/bbbbbbbbbunnies">Twitter</a></div>
    </IndexSection>

    <IndexSection>
      <h4>Projects</h4>
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
      <h4>Misc.</h4>
      <div><a href="https://docs.google.com/spreadsheets/d/1YAlCh6L0o0rLPLToGFb5x9du7NYFuplulTqX8ZKp3cs/edit?usp=sharing">My spreadsheet of music ratings</a></div>
   </IndexSection>
  </div>
);
