import React, { useState } from "react";
import {
  Row,
  Col,
  Menu,
  Button,
  Popover,
  Slider,
  Input,
  Avatar,
  Dropdown,
  Form,
  message,
} from "antd";
import { Dropdown as AntdDropdown } from "antd";
import { enquireScreen } from "enquire-js";
import Logo from "@Images/logo.png";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import {
  DownOutlined,
  DropboxOutlined,
  HeartFilled,
  HeartTwoTone,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import { IRegisterModel } from "@Models/ILoginModel";

interface Props {}

const TopMenu: React.FC<Props> = () => {
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
  const [dropdown, setDropdown] = useState(false);
  const [searchText, setSearchText] = React.useState<String>("");
  const [form] = Form.useForm();

  const menu2 = (
    <Menu>
      <Menu.Item>
        <Link to="/children" className="nav-links">
          Our children
        </Link>
      </Menu.Item>
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

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/myaccount" className="nav-links">
          My account
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/activityHistory`} className="nav-links">
          History
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/activityHistory/${3}`} className="nav-links">
          Notification
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to={"/"}
          onClick={() => (
            localStorage.setItem("currentUser", null), window.location.reload()
          )}
          className="nav-links"
        >
          Logout
        </Link>
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

  const onFinish = (values: any) => {
    setSearchText(values.searchText);
    document.getElementById("button-submit").click();
    form.resetFields();
  };

  return (
    <div id="customheader">
      <Row>
        <Col span={7}>
          <Link to="/">
            <div id="logo">
              <img src={Logo} />
            </div>
          </Link>
        </Col>
        <Col span={5}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="searchText">
              <Input
                style={{
                  top: "10px",
                  marginTop: "8px",
                  borderRadius: "25px",
                }}
                className="search-bar-custom"
                prefix={<SearchOutlined style={{ color: "#B62A2A" }} />}
              />
            </Form.Item>

            <Link
              id="button-submit"
              to={{ pathname: `/children/search?keyword=${searchText}` }}
            ></Link>
          </Form>
        </Col>

        <Col span={11}>
          <div className="header-meta">
            <div id="preview">
              {currentUser ? (
                <>
                  <Link
                    to={"/cart"}
                    id="preview-button"
                    style={{ paddingRight: "30px" }}
                  >
                    <HeartFilled style={{ fontSize: "18px", color: "red" }} />
                  </Link>
                  <Link to={"/myaccount"} id="preview-button">
                    <AntdDropdown overlay={menu}>
                      <Avatar style={{ backgroundColor: "#f56a00" }}>N</Avatar>
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
            <div id="menu">
              <Menu mode="horizontal">
                <Link className="ant-menu-item-custom" to={"/"}>
                  Home
                </Link>
                <Link className="ant-menu-item-custom" to={"/aboutUs"}>
                  About us
                </Link>
                <div className="ant-menu-item-custom">
                  <AntdDropdown overlay={menu2}>
                    <a onClick={(e) => e.preventDefault()}>
                      Children <DownOutlined className="icon-down" />
                    </a>
                  </AntdDropdown>
                  {dropdown && <DropboxOutlined />}
                </div>
                <Link className="ant-menu-item-custom" to={"/contactUs"}>
                  Contact us
                </Link>
              </Menu>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TopMenu;
