import * as React from "react";
import "@Styles/custom.scss";
import { FC } from "react";
import { Layout } from "antd";
import SideBar from "@Components/shared/SideBar";


const { Content } = Layout;

interface Props {
  children?: React.ReactNode;
  isCollapsed?: boolean;
  isAdmin?: boolean;
}

const AuthorizedSubLayout: FC<Props> = ({
  children,
  isCollapsed,
  isAdmin,
}: Props) => {
  return (
    <div className="body-layout">
      <Layout>
       
        <Content
          className={"body-content " + `${isCollapsed ? "isCollapsed" : ""}`}
        >
          <div className="site-layout-background">{children}</div>
        </Content>
      </Layout>
    </div>
  );
};

export default AuthorizedSubLayout;
