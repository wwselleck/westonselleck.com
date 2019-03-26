import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import "../theme/reset.module.css";
import "../theme/global.module.less";

export const RootLayout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" }
          ]}
        >
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans"
            rel="stylesheet"
          />
        </Helmet>
        {children}
      </div>
    )}
  />
);

RootLayout.propTypes = {
  children: PropTypes.func
};
