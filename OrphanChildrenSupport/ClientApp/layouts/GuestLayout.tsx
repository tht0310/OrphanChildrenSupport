import Footer from "@Components/shared/Guest/Footer";
import GuestTopMenu from "@Components/shared/Guest/GuestTopMenu";
import "@Styles/guestLayout.scss";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { ToastContainer } from "react-toastify";

interface IProps {
  children: any;
}

type Props = IProps & RouteComponentProps<any>;

export default class GuestLayout extends React.Component<Props, {}> {
  public render() {
    return (
      <div id="guestLayout" className="layout">
        <GuestTopMenu />
        <div className="">{this.props.children}</div>
        <ToastContainer />
        <Footer />
      </div>
    );
  }
}
