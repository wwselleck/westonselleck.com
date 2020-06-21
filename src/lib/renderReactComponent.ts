import * as React from "react";
import ReactDOMServer from "react-dom/server";

export function renderReactComponent(comp: React.ReactElement) {
  return `
    <head>
      <title>Weston Selleck</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
        rel="stylesheet">
      <link rel="stylesheet" href="public/reset.css" type="text/css" />
      <link rel="stylesheet" href="public/styles.css" type="text/css" />
    </head>
    <body>
      ${ReactDOMServer.renderToString(comp)}
    </body>
  `;
}
