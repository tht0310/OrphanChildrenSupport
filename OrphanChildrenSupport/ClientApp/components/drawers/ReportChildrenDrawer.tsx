import React, { useState } from "react";
import {
  Drawer,
  Button,
  Space,
  Select,
  Input,
  Form,
  Checkbox,
  DatePicker,
  Tooltip,
  Row,
  Col,
} from "antd";
import { DrawerProps } from "antd/es/drawer";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IRegisterModel } from "@Models/ILoginModel";
import {
  ArrowRightOutlined,
  SendOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

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
  { name: "Guardian Name", value: "guardianName" },
  { name: "Other", value: "other" },
];
const ReporChildrenDrawer: React.FC<IProps> = ({
  visible,
  onCancel,
  children,
  currentUser,
}: IProps) => {
  const [size, setSize] = useState<DrawerProps["size"]>();
  const [selectList, setSelectList] = useState([]);
  const [form] = Form.useForm();
  function findName(v) {
    let result = "";
    options.map((o) => {
      if (o.value === v) {
        result = o.name;
      }
    });
    return result;
  }

  function handleCancel() {
    form.resetFields();
    onCancel();
  }

  function renderOptions(v) {
    const tempList = [];
    v.map((v) => {
      switch (v) {
        case "dob":
          tempList.push(
            <Row style={{ marginBottom: "8px", marginTop: "8px" }}>
              <Col span={6}>
                <div style={{ width: "100%" }}>{findName(v)}</div>
              </Col>
              <Col span={18}>
                <Space>
                  <DatePicker
                    style={{ width: "100%" }}
                    format={"DD/MM/YYYY"}
                    defaultValue={moment(children[v])}
                    disabled
                  />
                  <ArrowRightOutlined style={{ color: "#e57905" }} />
                  <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
                </Space>
              </Col>
            </Row>
          );
          break;
        case "circumstance":
          tempList.push(
            <Row style={{ marginBottom: "8px" }}>
              <Col span={6}>
                <div style={{ width: "100%" }}>{findName(v)}</div>
              </Col>
              <Col span={18}>
                <TextArea rows={4} />
              </Col>
            </Row>
          );
          break;
        case "other":
          tempList.push(
            <Row style={{ marginBottom: "8px" }}>
              <Col span={6}>
                <div style={{ width: "100%" }}>{findName(v)}</div>
              </Col>
              <Col span={18}>
                <TextArea rows={2} />
              </Col>
            </Row>
          );
          break;
        default:
          tempList.push(
            <Row style={{ marginBottom: "8px" }}>
              <Col span={6}>
                <div style={{ width: "100%" }}>{findName(v)}</div>
              </Col>
              <Col span={18}>
                <Space>
                  <Input
                    style={{ width: "100%" }}
                    defaultValue={
                      v === "gender"
                        ? children[v]
                          ? "boy"
                          : "girl"
                        : children[v]
                    }
                    disabled
                  />

                  <ArrowRightOutlined style={{ color: "#e57905" }} />
                  <Input style={{ width: "100%" }} />
                </Space>
              </Col>
            </Row>
          );
          break;
      }
    });
    setSelectList(tempList);
  }

  return (
    <>
      <Drawer
        width={460}
        placement="right"
        size={size}
        title={<Space>Report information</Space>}
        onClose={handleCancel}
        visible={visible}
        extra={
          <Space>
            <Button
              style={{ color: "white", background: "#e57905" }}
              onClick={onCancel}
            >
              Send
            </Button>
          </Space>
        }
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%", paddingBottom: "20px" }}
          placeholder="Please select wrong information"
          onChange={(v) => renderOptions(v)}
        >
          {options.map((v) => {
            return <Select.Option value={v.value}>{v.name}</Select.Option>;
          })}
        </Select>
        {selectList.length > 0 && (
          <p style={{ paddingBottom: "8px" }}>
            Please enter correct information
          </p>
        )}
        <Form>{selectList}</Form>
      </Drawer>
    </>
  );
};

export default ReporChildrenDrawer;
