import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";

type Props = RouteComponentProps<{}>;

const NotAccessPage: React.FC<Props> = () => {
  return (
    <div className="not-access-page">
      <div className="lock"></div>
      <div className="message">
        <h1>Access to this page is restricted</h1>
        <p>Please contact admin if you believe this is a mistake.</p>
      </div>
    </div>
  );
};

export default NotAccessPage;
