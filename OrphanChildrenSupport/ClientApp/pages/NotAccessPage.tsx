import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";

type Props = RouteComponentProps<{}>;

const NotAccessPage: React.FC<Props> = () => {
  return (
    <div>
      <br />
      <p className="text-center" style={{ fontSize: "3rem" }}>
        You can not access to this page
      </p>
    </div>
  );
};

export default NotAccessPage;
