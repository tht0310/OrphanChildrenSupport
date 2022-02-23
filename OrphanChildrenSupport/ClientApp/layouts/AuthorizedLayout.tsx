﻿import React, { useState } from "react";
import "@Styles/authorizedLayout.scss";

import { Layout, Menu, Breadcrumb } from "antd";
import TopMenu from "../components/shared/TopMenu";
import SideBar from "../components/shared/SideBar";
import Content from "../components/shared/Content";

interface IProps {
  children?: React.ReactNode;
}

type Props = IProps;

const AuthorizedLayout: any = ({ children }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  function toggle() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div>
      <SideBar  isCollapsed={isCollapsed} toggle={toggle}/>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <TopMenu isCollapsed={isCollapsed} toggle={toggle}/>
        <div className="body flex-grow-1 px-3">
          <Content children={children} />
        </div>
      </div>
    </div>
  );
};

export default AuthorizedLayout;
