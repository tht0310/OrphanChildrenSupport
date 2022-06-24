import * as React from "react";
import { Breadcrumb, Input } from "antd";

import { useLocation } from "react-router-dom";

const routesName = [
  {
    path: "/admin/activityManagement/supportCategories",
    breadcrumb: ["Admin", "Activity Management", "Support Categories"],
  },
  {
    path: "/admin/profileManagement/children",
    breadcrumb: ["Admin", "Profile Management", "Children"],
  },
  { path: "/admin/dashboard", breadcrumb: ["Admin", "Dashboard"] },

  {
    path: "/admin/activityManagement/reports",
    breadcrumb: ["Admin", "Report", "Detail"],
  },
  {
    path: "/admin/activityManagement/donations",
    breadcrumb: ["Admin", "Activity Management", "Donations"],
  },
  {
    path: "/admin/profileManagement/members",
    breadcrumb: ["Admin", "Profile Management", "Members"],
  },
  {
    path: `/admin/profileManagement/systemUsers`,
    breadcrumb: ["Admin", "Profile Management", "System Users"],
  },

  {
    path: `/admin/activityManagement/reportFields`,
    breadcrumb: ["Admin", "Activity Management", "Report Fields"],
  },
  {
    path: `/admin/statistic`,
    breadcrumb: ["Admin", "Statistic"],
  },
  {
    path: `/admin/myAccount`,
    breadcrumb: ["Admin", "My Account"],
  },
  {
    path: `/admin/activityManagement/reports`,
    breadcrumb: ["Admin", "Activity Management", "Reports"],
  },
];
const { TextArea } = Input;

export interface IProps {}

const BreadcrumbCustom: React.FC<IProps> = ({}: IProps) => {
  const currentLocation = useLocation().pathname;

  function renderPath() {
    let breadcrumb = [];
    routesName.map((m) => {
      m.path === currentLocation ? (breadcrumb = m.breadcrumb) : 0;
    });
    return breadcrumb;
  }
  function renderItem() {
    let name = renderPath();
    const result = name.map((m) => [<Breadcrumb.Item>{m}</Breadcrumb.Item>]);
    return result;
  }

  return (
    <div className="breadscrum-container">
      <div>
        <Breadcrumb>{renderItem()}</Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbCustom;
