import React, { useState } from "react";
import {
  Drawer,
  Button,
  Space,
  Select,
  Input,
  Form,
  DatePicker,
  Row,
  Col,
  message,
} from "antd";
import { DrawerProps } from "antd/es/drawer";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IRegisterModel } from "@Models/ILoginModel";
import { ArrowRightOutlined } from "@ant-design/icons";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { IReportDetailModel, IReportModel } from "@Models/IReportModel";
import { IReportFieldModel } from "@Models/IReportFieldModel";
import ReportService from "@Services/ReportService";
import {
  lowercaseFirstLetter,
  options,
} from "@Components/shared/ReportFieldOptions";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  children: IChildrenProfileModel;
  currentUser: IRegisterModel;
  reportField: IReportFieldModel[];
}

const reportService = new ReportService();

const ReporChildrenDrawer: React.FC<IProps> = ({
  visible,
  onCancel,
  children,
  currentUser,
  reportField,
}: IProps) => {
  const [size, setSize] = useState<DrawerProps["size"]>();
  const [selectList, setSelectList] = useState([]);

  React.useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible]);

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

  function findId(name: string) {
    return reportField.filter((e) => e.title === name);
  }

  function handleCancel() {
    onCancel();
  }

  function renderOptions(v) {
    const tempList = [];

    v.map((v) => {
      switch (v) {
        case "DOB":
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
                    defaultValue={moment(children.dob)}
                    disabled
                  />
                  <ArrowRightOutlined style={{ color: "#e57905" }} />
                  <Form.Item
                    name={findId("DOB")[0].id}
                    label=""
                    style={{ marginBottom: 0 }}
                    rules={[{ required: true, message: "Field is required" }]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      format={"DD/MM/YYYY"}
                    />
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          );
          break;
        case "Circumstance":
          tempList.push(
            <Row style={{ marginBottom: "8px" }}>
              <Col span={6}>
                <div style={{ width: "100%" }}>{findName(v)}</div>
              </Col>
              <Col span={18}>
                <Form.Item
                  name={findId("Circumstance")[0].id}
                  label=""
                  style={{ marginBottom: 0 }}
                  rules={[{ required: true, message: "Field is required" }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          );
          break;

        case "Gender":
          tempList.push(
            <Row style={{ marginBottom: "8px" }}>
              <Col span={6}>
                <div style={{ width: "100%" }}>{findName(v)}</div>
              </Col>
              <Col span={18}>
                <Row>
                  <Col span={11}>
                    <Input
                      style={{ width: "100%" }}
                      defaultValue={children.gender ? "Boy" : "Girl"}
                      disabled
                    />
                  </Col>
                  <Col span={2}>
                    <ArrowRightOutlined
                      style={{
                        color: "#e57905",
                        marginLeft: "7px",
                        marginTop: "7px",
                      }}
                    />
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      name={findId(v)[0].id}
                      label=""
                      style={{ marginBottom: 0 }}
                      rules={[{ required: true, message: "Field is required" }]}
                    >
                      <Select style={{ width: "100%" }}>
                        <Select.Option value={"0"}>Boy</Select.Option>
                        <Select.Option value={"1"}>Girl</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
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
                    defaultValue={children[lowercaseFirstLetter(v)]}
                    disabled
                  />

                  <ArrowRightOutlined style={{ color: "#e57905" }} />
                  <Form.Item
                    name={findId(v)[0].id}
                    label=""
                    style={{ marginBottom: 0 }}
                    rules={[{ required: true, message: "Field is required" }]}
                  >
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          );
          break;
      }
    });
    setSelectList(tempList);
  }

  function onSubmit() {
    form.submit();
  }

  async function onFinish(values: any) {
    const reportDetail: IReportDetailModel[] = [];
    var result = Object.keys(values).map((key) => [Number(key), values[key]]);
    for (let index = 0; index < result.length; index++) {
      const element: IReportDetailModel = {
        reportFieldCategoryId: result[index][0],
        reportInformation: result[index][1],
      };
      reportDetail.push(element);
    }
    const report: IReportModel = {
      accountId: currentUser.id,
      childrenProfileId: children.id,
      reportDetails: reportDetail,
    };
    const res = await reportService.add(report);
    if (!res.hasErrors) {
      message.success("Report successfully");
      form.resetFields();
      onCancel();
    } else {
      message.error("Report unsuccessfully");
    }
  }

  return (
    <>
      <Form onFinish={onFinish} form={form}>
        <Drawer
          width={480}
          placement="right"
          size={size}
          title={<Space>Report Incorrect Detail</Space>}
          onClose={handleCancel}
          visible={visible}
          extra={
            <Space>
              <Button
                style={{ color: "white", background: "#e57905" }}
                onClick={onSubmit}
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
            {reportField.map((v) => {
              return (
                <Select.Option value={v.title}>
                  {findName(v.title)}
                </Select.Option>
              );
            })}
          </Select>
          {selectList.length > 0 && (
            <p style={{ paddingBottom: "8px" }}>
              Please enter correct information
            </p>
          )}

          {selectList}
        </Drawer>
      </Form>
    </>
  );
};

export default ReporChildrenDrawer;
