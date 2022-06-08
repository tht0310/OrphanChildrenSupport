import {
  CheckOutlined,
  CloseOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  EnterOutlined,
  EnvironmentFilled,
  EnvironmentOutlined,
  InboxOutlined,
  LeftOutlined,
  LoadingOutlined,
  PhoneOutlined,
  PlusOutlined,
  RightOutlined,
  SaveOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Steps,
  StepsProps,
  Table,
  Tag,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import * as React from "react";
import { useEffect } from "react";
import { Edit2, Trash2 } from "react-feather";
type Props = {};

const ReportDetailPage: React.FC<Props> = () => {
  const [filterBy, setFilterBy] = React.useState<string>("fullName");
  const [filterValue, setFilterValue] = React.useState<string>();
  const [imageUrl, setImageUrl] = React.useState<string>("");

  useEffect(() => {
    document.title = "Dashboard - Quy trình";
  }, []);
  useEffect(() => {}, [filterBy, filterValue]);

  const customDot: StepsProps["progressDot"] = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      dataIndex: "age",
      key: "age",
      width: "8%",
    },
    {
      title: "Information Type",
      key: "tags",
      dataIndex: "tags",
      width: "20%",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 7 ? "geekblue" : "green";
            if (tag === "gender") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Detail",
      dataIndex: "address",
      key: "address",
      width: "50%",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "10%",
      render: () => (
        <>
          <Space className="actions">
            <Button
              className="btn-custom-2 blue-action-btn"
              icon={<CheckOutlined size={14} style={{ color: "#40A9FF" }} />}
            />
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <Button
                className="btn-custom-2 red-action-btn"
                icon={<CloseOutlined size={16} style={{ color: "#FA6D70" }} />}
              ></Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Jim Green",
      age: 1,
      address: "Boy",
      tags: ["gender"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 2,
      address: "14/12/2016",
      tags: ["Birthday"],
    },
    {
      key: "3",
      name: "John Brown",
      age: 3,
      address: "Số 2a, đường Bến Than, xã Hòa Phú, huyện Củ Chi, TPHCM",
      tags: ["address"],
    },
  ];

  return (
    <div className="table-container">
      <div style={{ padding: "6px 20px" }}>
        <span>
          <h6>
            <Row>
              <Col span={16}>
                {" "}
                <span>
                  Report Number <span style={{ color: "red" }}>#12345</span>
                </span>
              </Col>

              <Col span={8} style={{ paddingBottom: 0 }}>
                <Form style={{ float: "right" }} layout="inline">
                  <Form.Item label="">
                    <Select defaultValue={"1"} style={{ width: "110%" }}>
                      <Select.Option value="0">Send</Select.Option>
                      <Select.Option value="1">Verification</Select.Option>
                      <Select.Option value="2">Donating</Select.Option>
                      <Select.Option value="3">Finish</Select.Option>
                    </Select>
                  </Form.Item>
                  <Button type="primary" ghost danger>
                    Save
                  </Button>
                </Form>
              </Col>
            </Row>
          </h6>
        </span>

        <Steps
          current={1}
          progressDot={customDot}
          style={{ padding: "35px 35px 10px 35px" }}
        >
          <Steps.Step title="Send" />
          <Steps.Step title="Verification" />
          <Steps.Step title="Finish" />
        </Steps>

        <Row style={{ margin: "25px 0px" }}>
          <Col span={24}>
            <Row style={{ marginBottom: "25px" }}>
              <Col span={12} style={{ paddingRight: "12px" }}>
                {" "}
                <Card>
                  <h6
                    style={{
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  >
                    Reporter
                  </h6>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    Đào Quỳnh Như
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    (+84) 902331151
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    Số 1a, đường Bến Than, xã Hòa Phú, huyện Củ Chi, TP.HCM
                  </div>
                </Card>
              </Col>
              <Col span={12} style={{ paddingLeft: "12px" }}>
                <Card>
                  <h6
                    style={{
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  >
                    Children
                  </h6>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    Đào Quỳnh Như
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    (+84) 902331151
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    Số 1a, đường Bến Than, xã Hòa Phú, huyện Củ Chi, TP.HCM
                  </div>
                </Card>
              </Col>
            </Row>
            <Table
              className="custom-table"
              columns={requestColumns}
              dataSource={data}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReportDetailPage;
