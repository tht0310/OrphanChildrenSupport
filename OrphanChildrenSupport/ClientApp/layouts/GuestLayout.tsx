import Footer from "@Components/shared/Guest/Footer";
import TopMenu from "@Components/shared/Guest/TopMenu";

import * as React from "react";
import { RouteComponentProps } from "react-router";

interface IProps {
  children: any;
}

type Props = IProps & RouteComponentProps<any>;

export default class GuestLayout extends React.Component<Props, {}> {
  public render() {
    return (
      <div id="guestLayout" className="layout">
        <TopMenu />
        <div className="">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
