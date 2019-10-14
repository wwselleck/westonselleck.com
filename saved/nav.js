import React from "react";
import { Link } from 'gatsby';
import { Header } from "../components/typography";

import styles from "./nav.module.css";

export const Navigation = () => (
  <div className={styles.header}>
    <div className={styles.headerWrapper}>
      <Link to="/"><Header size="medium">Weston Selleck</Header></Link>
    </div>
  </div>
);
