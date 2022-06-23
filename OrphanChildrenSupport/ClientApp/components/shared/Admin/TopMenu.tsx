import React, { FC } from "react";
import {
  Link,
  NavLink,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";
import { Avatar, Badge, Menu } from "antd";
import { IRegisterModel } from "@Models/ILoginModel";
import { Dropdown as AntdDropdown } from "antd";
interface Props extends RouteComponentProps {
  isCollapsed: boolean;
  toggle: () => void;
}

const TopMenu: FC<Props> = ({ isCollapsed = false, toggle }: Props) => {
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
  React.useEffect(() => {
    getCurrentUser();
  }, []);

  function findName(value) {
    if (value) {
      const name = value.split(" ");
      return name[name.length - 1][0];
    }
  }

  function getCurrentUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setCurrentUser(JSON.parse(retrievedObject));
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/admin/myaccount" className="nav-links">
          My account
        </Link>
      </Menu.Item>

      <Menu.Item>
        <a
          onClick={() => (
            localStorage.setItem("currentUser", null), window.location.reload()
          )}
          className="nav-links"
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={() => toggle()}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/admin/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/">Home Page</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#" className="avartar">
              <AntdDropdown overlay={menu}>
                <Avatar style={{ backgroundColor: "#f56a00" }}>
                  {findName(currentUser?.fullName)}
                </Avatar>
              </AntdDropdown>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default withRouter(TopMenu);
