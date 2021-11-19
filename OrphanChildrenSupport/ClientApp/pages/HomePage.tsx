import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";

type Props = RouteComponentProps<{}>;

const HomePage: React.FC<Props> = () => {
  return (
    <div>
      <Helmet>
        <title>Home page - OrphanChildrenSupport</title>
      </Helmet>

      <br />
    </div>
  );
};

export default HomePage;
