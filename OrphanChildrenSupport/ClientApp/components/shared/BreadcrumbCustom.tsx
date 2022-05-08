import * as React from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { Plus, Save } from "react-feather";

import SupportCategoryService from "@Services/SupportCategoryService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { displayDateTime } from "@Services/FormatDateTimeService";
import ChildrenSupportCategoryService from "@Services/ChildrenSupportCategoryService";
import { useLocation } from "react-router-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";

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
