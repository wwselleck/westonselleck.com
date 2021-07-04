import React from 'react';
import ReactDOMServer from "react-dom/server";
import { renderRoot } from './root-template';

export function renderSecondaryPage(el: React.ReactNode) {
  return renderRoot(ReactDOMServer.renderToString(<SecondaryPageWrapper>
    {el}
    </SecondaryPageWrapper>))
}

const SecondaryPageWrapper: React.FC = ({children}) => {
  return <div className="secondaryPage">
    <div className="mainColumn">
      <div className="secondaryPageNav"><a  href="/">&#60; Home</a></div>
      {children}
    </div>
  </div>
}
