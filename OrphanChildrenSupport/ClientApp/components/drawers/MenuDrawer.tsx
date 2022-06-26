import {
  CalendarOutlined,
  DownOutlined,
  DropboxOutlined,
  LinkOutlined,
  RightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Drawer, Menu, Row } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown as AntdDropdown } from "antd";
import { IRegisterModel } from "@Models/ILoginModel";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  currentUser: IRegisterModel;
}

const menu2 = (
  <Menu>
    <Menu.Item>
      <Link to="/children" className="nav-links">
        All
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/children/supported" className="nav-links">
        Supported
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/children/waitingForSupport" className="nav-links">
        Waiting For Support
      </Link>
    </Menu.Item>
  </Menu>
);
const MenuDrawer: React.FC<IProps> = ({
  visible,
  onCancel,
  currentUser,
}: IProps) => {
  const [isVisible, setVisible] = React.useState<boolean>(true);

  function toggleVisible() {
    setVisible(!isVisible);
  }
  return (
    <>
      <Drawer
        title=""
        placement="left"
        onClose={onCancel}
        visible={visible}
        className="menu-drawer"
      >
        <div className="ant-menu-item-custom">
          <Link onClick={onCancel} to={"/"}>
            Home
          </Link>
        </div>
        <Divider />
        <div onClick={(e) => toggleVisible()} className="ant-menu-item-custom">
          <div className="ant-menu-item-custom">
            <Row>
              <Col span={12}>
                <a>Children</a>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                {!isVisible ? (
                  <DownOutlined style={{ textAlign: "right" }} />
                ) : (
                  <RightOutlined style={{ textAlign: "right" }} />
                )}
              </Col>
            </Row>
          </div>
        </div>
        <div className={isVisible ? "hide" : "appear"}>
          <div onClick={onCancel} className="ant-menu-item-custom">
            <Link to="/children">All children</Link>
          </div>
          <div onClick={onCancel} className="ant-menu-item-custom">
            <Link to="/children/supported">Childen supported</Link>
          </div>
          <div onClick={onCancel} className="ant-menu-item-custom">
            <Link to="/children/waitingForSupport">
              Children waiting For Support
            </Link>
          </div>
        </div>
        <Divider />
        <div onClick={onCancel} className="ant-menu-item-custom">
          <Link to={"/aboutUs"}>About Us</Link>
        </div>
        <Divider />
        <div onClick={onCancel} className="ant-menu-item-custom">
          <Link to={"/contactUs"}>Contact Us</Link>
        </div>
        <Divider />
        {currentUser !== null && (
          <>
            <div className="ant-menu-item-custom">
              <Link onClick={onCancel} to={"/myAccount"}>
                My account
              </Link>
            </div>
            <Divider />
            <div onClick={onCancel} className="ant-menu-item-custom">
              <Link to={"/activityHistory"}>Activity History</Link>
            </div>
            <Divider />
            <div onClick={onCancel} className="ant-menu-item-custom">
              <Link to={"/notification"}>Notification</Link>
            </div>
            <Divider />

            <div className="ant-menu-item-custom">
              <a
                onClick={() => (
                  localStorage.setItem("currentUser", null),
                  window.location.reload(),
                  onCancel()
                )}
              >
                Logout
              </a>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default MenuDrawer;
