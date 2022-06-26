import React, { useState } from "react";
import { Row, Col, Menu, Button, Input, Avatar, Form, MenuProps } from "antd";
import { Dropdown as AntdDropdown } from "antd";
import Logo from "@Images/logo.png";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  DownOutlined,
  DropboxOutlined,
  HeartFilled,
  MailOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { IRegisterModel } from "@Models/ILoginModel";
import MenuDrawer from "@Components/drawers/MenuDrawer";

interface Props {}

const TopMenu: React.FC<Props> = () => {
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
  const [dropdown, setDropdown] = useState(false);
  const [searchText, setSearchText] = React.useState<String>("");
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState<boolean>(false);

  function toggleMenu() {
    setVisible(!visible);
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

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/myAccount" className="nav-links">
          My Account
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/activityHistory`} className="nav-links">
          Activity History
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/notification`} className="nav-links">
          Notification
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

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  function getCurrentUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setCurrentUser(JSON.parse(retrievedObject));
    }
  }

  function findName(value) {
    if (value) {
      const name = value.split(" ");
      return name[name.length - 1][0];
    }
  }
  const onFinish = (values: any) => {
    setSearchText(values.searchText);
    document.getElementById("button-submit").click();
    form.resetFields();
  };

  return (
    <div id="customheader">
      <Row>
        <Col span={2} lg={0} xs={4} className="menu-icon">
          <MenuOutlined
            color="black"
            style={{ fontSize: "15px" }}
            onClick={toggleMenu}
          />
        </Col>
        <Col span={7} lg={7} xs={12}>
          <Link to="/">
            <div id="logo">
              <img src={Logo} />
            </div>
          </Link>
        </Col>
        <Col span={5} lg={5} xs={0} className="guest-menu-search-container">
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="searchText">
              <Input
                style={{
                  top: "10px",
                  marginTop: "8px",
                  borderRadius: "25px",
                }}
                placeholder="Search children by name"
                className="search-bar-custom"
                prefix={<SearchOutlined style={{ color: "#B62A2A" }} />}
              />
            </Form.Item>

            <Link
              id="button-submit"
              to={{ pathname: `/search/${searchText}` }}
            ></Link>
          </Form>
        </Col>

        <Col span={11} lg={11} xs={8}>
          <div className="header-meta">
            <div id="preview">
              {currentUser ? (
                <>
                  <Link
                    to={"/favorite"}
                    id="preview-button"
                    style={{ paddingRight: "30px" }}
                  >
                    <HeartFilled style={{ fontSize: "18px", color: "red" }} />
                  </Link>
                  <Link to={"/myAccount"} id="preview-button">
                    <AntdDropdown overlay={menu}>
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                        {findName(currentUser?.fullName)}
                      </Avatar>
                    </AntdDropdown>
                  </Link>
                </>
              ) : (
                <Link
                  to={"/login"}
                  id="preview-button"
                  rel="noopener noreferrer"
                >
                  <Button>Login</Button>
                </Link>
              )}
            </div>
            <div id="menu" className="menu-container">
              <Menu mode="horizontal">
                <Link className="ant-menu-item-custom" to={"/"}>
                  Home
                </Link>
                <div className="ant-menu-item-custom">
                  <AntdDropdown overlay={menu2}>
                    <a onClick={(e) => e.preventDefault()}>
                      Children <DownOutlined className="icon-down" />
                    </a>
                  </AntdDropdown>
                  {dropdown && <DropboxOutlined />}
                </div>
                <Link className="ant-menu-item-custom" to={"/aboutUs"}>
                  About Us
                </Link>
                <Link className="ant-menu-item-custom" to={"/contactUs"}>
                  Contact Us
                </Link>
              </Menu>
            </div>
          </div>
        </Col>
      </Row>
      <MenuDrawer
        currentUser={currentUser}
        visible={visible}
        onCancel={toggleMenu}
      ></MenuDrawer>
    </div>
  );
};

export default TopMenu;
