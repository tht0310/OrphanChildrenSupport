import React, { useState } from "react";
import "@Styles/authorizedLayout.scss";

import TopMenu from "../components/shared/Admin/TopMenu";
import SideBar from "../components/shared/Admin/SideBar";
import Content from "../components/shared/Content";
import BreadcrumbCustom from "@Components/shared/BreadcrumbCustom";

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
      <SideBar isCollapsed={isCollapsed} toggle={toggle} />
      <div className="wrapper d-flex flex-column bg-light">
        <TopMenu isCollapsed={isCollapsed} toggle={toggle} />
        <BreadcrumbCustom />
        <div className="body flex-grow-1 px-3">
          <Content children={children} />
        </div>
      </div>
    </div>
  );
};

export default AuthorizedLayout;
