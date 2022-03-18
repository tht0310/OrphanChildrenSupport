import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

import { Menu, Dropdown as AntdDropdown } from "antd";
import Dropdown from "./Dropdown";

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/children" className="nav-links">
        Children
      </Link>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        2st menu item
      </a>
    </Menu.Item>
  </Menu>
);

function GuestTopMenu() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

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
            <AntdDropdown overlay={menu}>
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
          <li className="nav-item">
            <Link to="/signin" className="nav-links" onClick={closeMobileMenu}>
              <span className="red-button">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default GuestTopMenu;
