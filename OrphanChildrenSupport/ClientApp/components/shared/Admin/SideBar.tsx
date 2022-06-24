import * as React from "react";
import { CSidebar, CSidebarBrand, CSidebarNav } from "@coreui/react";
import SimpleBar from "simplebar-react";
import { Navigation } from "./Navigation";

import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { FC } from "react";
import Logo from "@Images/logo3.png";
import { getMenus } from "./Navigations";
import { IRegisterModel } from "@Models/ILoginModel";
interface Props extends RouteComponentProps {
  isCollapsed: boolean;
  toggle: () => void;
}

const Sidebar: FC<Props> = ({ isCollapsed = false }: Props) => {
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
  React.useEffect(() => {
    getCurrentUser();
  }, []);
  function getCurrentUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setCurrentUser(JSON.parse(retrievedObject));
    }
  }

  {
    return (
      <CSidebar position="fixed" visible={!isCollapsed}>
        <Link to="/admin/dashboard">
          <CSidebarBrand className="d-none d-md-flex logo-container">
            <img src={Logo} alt="" className="logo" />
          </CSidebarBrand>
        </Link>
        <CSidebarNav>
          <SimpleBar>
            <Navigation
              items={
                currentUser?.role === "Admin" ? getMenus(true) : getMenus(false)
              }
            />
          </SimpleBar>
        </CSidebarNav>
      </CSidebar>
    );
  }
};

export default withRouter(Sidebar);
