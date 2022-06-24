import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";

type Props = RouteComponentProps<{}>;

const NotFoundPage: React.FC<Props> = () => {
  return (
    <div className="not-access-page" style={{ height: "80vh" }}>
      <div style={{ fontSize: "90px", paddingBottom: "0", lineHeight: 1.2 }}>
        404
      </div>
      <div className="message">
        <h1 style={{ marginTop: 0, fontSize: "25" }}>NOT FOUND PAGE</h1>
        <p>The resource requested could not be found on this server.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
