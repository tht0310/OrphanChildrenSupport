import React, { useState } from "react";
import { Drawer, Button, Space, Select } from "antd";
import { DrawerProps } from "antd/es/drawer";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IRegisterModel } from "@Models/ILoginModel";
import { WarningOutlined } from "@ant-design/icons";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  children: IChildrenProfileModel;
  currentUser: IRegisterModel;
}
const options = [
  { name: "Full Name", value: "fullName" },
  { name: "Birthday", value: "dob" },
  { name: "Address", value: "publicAddress" },
  { name: "Gender", value: "gender" },
  { name: "Circumstance", value: "circumstance" },
  { name: "GuardianName", value: "guardianName" },
  { name: "Other", value: "other" },
];
const ReporChildrenDrawer: React.FC<IProps> = ({
  visible,
  onCancel,
  children,
  currentUser,
}: IProps) => {
  const [size, setSize] = useState<DrawerProps["size"]>();

  function renderOptions(v) {
    return <div>asa</div>;
  }

  return (
    <>
      <Drawer
        placement="right"
        size={size}
        title={<Space>Report information</Space>}
        onClose={onCancel}
        visible={visible}
        extra={
          <Space>
            <Button type="primary" onClick={onCancel}>
              OK
            </Button>
          </Space>
        }
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select wrong information"
          onChange={(v) => renderOptions(v)}
        >
          {options.map((v) => {
            return <Select.Option value={v.value}>{v.name}</Select.Option>;
          })}
        </Select>
      </Drawer>
    </>
  );
};

export default ReporChildrenDrawer;
