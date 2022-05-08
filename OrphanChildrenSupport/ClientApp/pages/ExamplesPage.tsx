import React from "react";
import { Row, Col, Menu, Button, Popover, Slider, Input, Avatar } from "antd";

import { enquireScreen } from "enquire-js";
import Logo from "@Images/logo.png";
import { Link, RouteComponentProps } from "react-router-dom";
import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";

type Props = RouteComponentProps<{}>;

const ExamplePage: React.FC<Props> = ({}: Props) => {
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
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

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  function getCurrentUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setCurrentUser(JSON.parse(retrievedObject));
    }
  }

  return (
    <div id="customheader">
      <Row>
        <Col span={7}>
          <div id="logo">
            <img src={Logo} />
          </div>
        </Col>
        <Col span={5}>
          <Input
            style={{
              top: "10px",
              marginTop: "8px",
              borderRadius: "25px",
            }}
            className="search-bar-custom"
            prefix={<SearchOutlined style={{ color: "#B62A2A" }} />}
          />
        </Col>

        <Col span={11}>
          <div className="header-meta">
            <div id="preview">
              {currentUser ? (
                <Link
                  to={"/myaccount"}
                  id="preview-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar style={{ backgroundColor: "#f56a00" }}>N</Avatar>
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  id="preview-button"
                  target="_blank"
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
                <Link className="ant-menu-item-custom" to={"/"}>
                  About us
                </Link>
                <Link className="ant-menu-item-custom" to={"/"}>
                  Children{" "}
                  <DownOutlined
                    className="icon-down"
                    style={{ fontSize: "85%", marginBottom: "20px" }}
                  />
                </Link>
                <Link className="ant-menu-item-custom" to={"/"}>
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

export default ExamplePage;
