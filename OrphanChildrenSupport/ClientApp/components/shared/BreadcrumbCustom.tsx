import * as React from "react";
import { Breadcrumb, Input } from "antd";

import { useLocation } from "react-router-dom";

const routesName = [
  {
    path: "/admin/usermanagement/supportcategory",
    breadcrumb: ["Home", "User Management", "Support Category"],
  },
  {
    path: "/admin/usermanagement/children",
    breadcrumb: ["Home", "User Management", "Children"],
  },
  { path: "/admin/dashboard", breadcrumb: ["Home", "Dashboard"] },
  { path: "/admin", breadcrumb: ["Home", "Dashboard"] },
  {
    path: "/admin/donation/detail",
    breadcrumb: ["Home", "Donation", "Detail"],
  },
  {
    path: "/admin/report/detail",
    breadcrumb: ["Home", "Report", "Detail"],
  },
  {
    path: "/admin/activitymanagement/donation",
    breadcrumb: ["Home", "Activity Management", "Donation"],
  },
  {
    path: "/admin/user",
    breadcrumb: ["Home", "User Management", "User"],
  },
  {
    path: `/admin/donation/detail/`,
    breadcrumb: ["Home", "Donation", "Detail"],
  },
  {
    path: `/admin/activitymanagement/reportfield`,
    breadcrumb: ["Home", "User Management", "Report Field"],
  },
  {
    path: `/admin/activitymanagement/report`,
    breadcrumb: ["Home", "User Management", "Report"],
  },
  {
    path: `/admin/statistic`,
    breadcrumb: ["Home", "Statistic"],
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
