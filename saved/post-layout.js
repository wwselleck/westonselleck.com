import * as React from "react";

import { Header } from '../components/typography';

import PageLayout from './page-layout'
import styles from './post-layout.module.less';


export default class PostLayout extends React.Component {
  render() {
    const { title, html } = this.props;
    return (
      <PageLayout>
        <div className={styles.postWrapper}>
          <Header>{title}</Header>
          <div className={styles.md} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </PageLayout>
    )
  }
}
