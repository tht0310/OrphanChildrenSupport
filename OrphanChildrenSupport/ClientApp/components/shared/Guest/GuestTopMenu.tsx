import { DownOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Button } from "./Button";
import * as loginStore from "@Store/loginStore";
import { Menu } from "antd";
import { Dropdown as AntdDropdown } from "antd";

import SessionManager from "@Core/session";
import { withStore } from "@Store/index";
import { IRegisterModel } from "@Models/ILoginModel";
import Dropdown from "./Dropdown";

type Props = RouteComponentProps<{}> &
  typeof loginStore.actionCreators &
  loginStore.ILoginStoreState;

const GuestTopMenu: React.FC<Props> = (props: Props) => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const menu = (
    <Menu>
      <Menu.Item>
        <a>Hi {currentUser?.fullName}</a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu>
      <Menu.Item>
        <Link to="/childrenSupported" className="nav-links">
          Children supported
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/childrenWaitingForSupport" className="nav-links">
          Children waiting for support
        </Link>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    document.title = "Dashboard - Quy trình";
    setCurrentUser(props.currentUser);
  }, [props.currentUser]);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo logo-10" onClick={closeMobileMenu}>
          <h3>FOR THE CHILDREN</h3>
          <p>&nbsp;</p>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <MenuOutlined /> : <MenuOutlined />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
              Home <i className="fas fa-caret-down" />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link to="/aboutUs" className="nav-links" onClick={closeMobileMenu}>
              About us
            </Link>
          </li>
          <li className="nav-item">
            <AntdDropdown overlay={menu2}>
              <a className="nav-links" onClick={(e) => e.preventDefault()}>
                Children <DownOutlined />
              </a>
            </AntdDropdown>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link
              to="/contactUs"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          {currentUser ? (
            <li className="nav-item">
              <AntdDropdown overlay={menu}>
                <UserOutlined
                  style={{
                    fontSize: "20px",
                    color: "#88181b",
                    paddingLeft: "15px",
                    paddingRight: "5px",
                  }}
                />
              </AntdDropdown>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                <span className="red-button">Login</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

var connectedComponent = withStore(
  GuestTopMenu,
  (state) => state.login, // Selects which state properties are merged into the component's props.
  loginStore.actionCreators // Selects which action creators are merged into the component's props.
);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);
