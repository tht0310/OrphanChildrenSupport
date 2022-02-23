import { MenuOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import Dropdown from "./Dropdown";

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
            <Link
              to="/home"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Home <i className="fas fa-caret-down" />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link
              to="/aboutUs"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              About us
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/services"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Service <i className="fas fa-caret-down" />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className="nav-item">
            <Link
              to="/contact-us"
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
