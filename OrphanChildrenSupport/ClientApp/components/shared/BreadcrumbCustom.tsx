import * as React from "react";
import { Breadcrumb, Input } from "antd";

import { useLocation } from "react-router-dom";

const routesName = [
  {
    path: "/admin/activityManagement/supportCategory",
    breadcrumb: ["Admin", "Activity Management", "Support Category"],
  },
  {
    path: "/admin/profileManagement/children",
    breadcrumb: ["Admin", "Profile Management", "Children"],
  },
  { path: "/admin/dashboard", breadcrumb: ["Admin", "Dashboard"] },
  { path: "/admin", breadcrumb: ["Admin", "Dashboard"] },

  {
    path: "/admin/activityManagement/report",
    breadcrumb: ["Admin", "Report", "Detail"],
  },
  {
    path: "/admin/activityManagement/donation",
    breadcrumb: ["Admin", "Activity Management", "Donation"],
  },
  {
    path: "/admin/profileManagement/member",
    breadcrumb: ["Admin", "Profile Management", "Member"],
  },
  {
    path: `/admin/profileManagement/systemUser`,
    breadcrumb: ["Admin", "Profile Management", "System User"],
  },

  {
    path: `/admin/activityManagement/reportField`,
    breadcrumb: ["Admin", "Activity Management", "Report Field"],
  },
  {
    path: `/admin/activitymManagement/report`,
    breadcrumb: ["Admin", "User Management", "Report"],
  },
  {
    path: `/admin/statistic`,
    breadcrumb: ["Admin", "Statistic"],
  },
  {
    path: `/admin/myaccount`,
    breadcrumb: ["Admin", "My Account"],
  },
  {
    path: `/admin/activityManagement/report`,
    breadcrumb: ["Admin", "Activity Management", "Report"],
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
