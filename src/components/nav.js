import React from "react";
import Link from "gatsby-link";
import { Header } from "../components/typography";

import styles from "./nav.module.css";

export const Navigation = () => (
  <div className={styles.header}>
    <div className={styles.headerWrapper}>
      <Header size="medium">Weston Selleck</Header>
    </div>
  </div>
);
