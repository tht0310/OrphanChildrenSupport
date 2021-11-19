import React, { FC, useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Layout, Menu } from "antd";
import { Link, RouteComponentProps } from "react-router-dom";
import { Circle, Phone } from "react-feather";

import { getMenus } from "@Components/shared/LayoutService";
import { MenuModel } from "@Models/IMenuModel";

const { Sider } = Layout;
const { SubMenu } = Menu;

interface Props extends RouteComponentProps {
  isCollapsed: boolean;
  isAdmin?: boolean;
}

const CustomSideBar: FC<Props> = ({
  isCollapsed = false,
  location,
  isAdmin,
}: Props) => {
  const [menus, setMenus] = useState<MenuModel[]>([]);
  const [activeMenu, setActiveMenu] = useState<string>();
  const [openMenu, setOpenMenu] = useState<string>();
  const [splitPath, setSplitPath] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const pathname = location.pathname;
    const splitPathTmp = pathname.split("/");
    const menusTmp: MenuModel[] = getMenus(splitPathTmp[1]?.toLowerCase());
    setSplitPath(splitPathTmp[1]?.toLowerCase());
    setMenus(menusTmp);
    if (splitPathTmp.length > 2) {
      setOpenMenu(splitPathTmp[2].toLowerCase());
    } else {
      setOpenMenu("0");
    }
    if (splitPathTmp.length > 3) {
      setActiveMenu(splitPathTmp[3].toLowerCase());
    } else {
      setActiveMenu("0");
    }
  }, [location]);

  function handleOpenMenu(key: string) {
    if (openMenu === key) {
      setOpenMenu("0");
    } else {
      setOpenMenu(key);
    }
  }

  return menus?.length > 0 ? (
    <Sider
      className="sider"
      trigger={null}
      collapsible
      collapsed={isCollapsed}
      width={240}
      breakpoint="lg"
      collapsedWidth={60}
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
    >
      <div className={`menu-wrap ${isAdmin ? " admin-menu-wrap" : ""}`}>
        {activeMenu && openMenu && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[activeMenu]}
            openKeys={[openMenu]}
          >
            {menus.map((menu) =>
              menu.children?.length > 0 ? (
                <SubMenu
                  key={menu.id}
                  title={menu.title}
                  className="menu-item"
                  icon={menu.icon}
                  onTitleClick={(menu) => handleOpenMenu(menu.key)}
                >
                  {menu.children.map((childMenu) => (
                    <Menu.Item
                      key={childMenu.id}
                      className="sub-menu-item"
                      icon={childMenu.icon}
                    >
                      <Link to={childMenu.url}>{childMenu.title}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={menu.id} className="menu-item" icon={menu.icon}>
                  <Link to={menu.url}>{menu.title}</Link>
                </Menu.Item>
              )
            )}
            <Menu.Divider />
          </Menu>
        )}
      </div>
    </Sider>
  ) : (
    <></>
  );
};

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(CustomSideBar);
