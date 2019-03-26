import * as React from "react";
import { RootLayout } from "./root-layout";
import { Navigation } from "../components/nav";
import effects from "../theme/effects.module.css";

export default class PageLayout extends React.Component {
  componentDidMount() {
    document.body.className = effects.colorchange;
  }

  render () {
    let { children } = this.props;
    return (
      <RootLayout>
        <Navigation />
        {children}
      </RootLayout>
    )
  }
}
