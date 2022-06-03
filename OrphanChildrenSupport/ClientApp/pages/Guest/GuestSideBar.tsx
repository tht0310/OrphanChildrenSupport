import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";

type Props = RouteComponentProps<{}>;

const GuestSideBar: React.FC<Props> = ({}: Props) => {
  const items = [
    getItem("Navigation One", "1", <MailOutlined />),
    getItem("Navigation Two", "2", <CalendarOutlined />),

    getItem(
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design
      </a>,
      "link",
      <LinkOutlined />
    ),
  ];
  function getItem(label, key, icon, children?) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  return (
    <div>
      <Menu
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        theme={"light"}
      />
    </div>
  );
};

export default GuestSideBar;
