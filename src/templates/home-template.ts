import ReactDOMServer from "react-dom/server";
import { renderRoot } from './root-template';

export function renderHomePage(el) {
  return renderRoot(ReactDOMServer.renderToString(el), {
    scripts: ['public/index.js']
  });
}
