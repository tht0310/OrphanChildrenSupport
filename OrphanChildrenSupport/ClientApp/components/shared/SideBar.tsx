import * as React from "react";

import { CSidebar, CSidebarBrand, CSidebarNav } from "@coreui/react";
import SimpleBar from "simplebar-react";
import { Navigation } from "./Navigation";
import navigations from "./Navigations";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FC } from "react";
import Logo from "@Images/logo3.png";
interface Props extends RouteComponentProps {
  isCollapsed: boolean;
  toggle: () => void;
}

const Sidebar: FC<Props> = ({ isCollapsed = false, toggle }: Props) => {
  {
    return (
      <CSidebar position="fixed" visible={!isCollapsed}>
        <CSidebarBrand className="d-none d-md-flex logo-container">
          <img src={Logo} alt="" className="logo" />
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            <Navigation items={navigations} />
          </SimpleBar>
        </CSidebarNav>
      </CSidebar>
    );
  }
};

export default withRouter(Sidebar);
