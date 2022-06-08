import {
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

const inlineFormLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 18,
  },
};

const DonationDetailPage: React.FC<Props> = () => {
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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      dataIndex: "age",
      key: "age",
      width: "8%",
    },
    {
      title: "Donation",
      key: "tags",
      dataIndex: "tags",
      width: "18%",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "money") {
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
      width: "45%",
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
              icon={<Edit2 size={14} style={{ color: "#40A9FF" }} />}
            />
            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
              <Button
                className="btn-custom-2 red-action-btn"
                icon={<Trash2 size={16} style={{ color: "#FA6D70" }} />}
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
      name: "John Brown",
      age: 1,
      address:
        "We will give this children some rice, noodles, milk and vegetables",
      tags: ["food"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 2,
      address: "500,000 VND",
      tags: ["money"],
    },
  ];

  return (
    <div className="table-container">
      <div style={{ padding: "6px 20px" }}>
        <span>
          <h6>
            <span>
              Donation Number <span style={{ color: "red" }}>#12345</span>
            </span>
            <span style={{ float: "right", fontWeight: "normal" }}>
              <Button type="primary" ghost>
                Save <SaveOutlined className="icon-antd-custom" />
              </Button>
            </span>
          </h6>
        </span>

        <Steps
          current={3}
          status="error"
          progressDot={customDot}
          style={{ padding: "35px 35px 10px 35px" }}
        >
          <Steps.Step title="Send" />
          <Steps.Step title="Verification" />
          <Steps.Step title="Confirming" />
          <Steps.Step title="Donating" />
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
                    Supporter
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
        <Row style={{ marginTop: "5px" }}>
          <Col span={8} style={{ marginRight: "10px" }}>
            <Card bodyStyle={{ minHeight: "90px" }}>
              <h6
                style={{
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                Note
              </h6>
              <div>Please contact me after 5:00 PM</div>
            </Card>
          </Col>
          <Col span={8} style={{ margin: "0px 10px" }}>
            <Card bodyStyle={{ minHeight: "80px" }}>
              <h6
                style={{
                  fontSize: "14px",
                  marginBottom: "22px",
                }}
              >
                Donation Image
              </h6>
              <Form>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader avatar-custom"
                  showUploadList={false}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form>
            </Card>
          </Col>
          <Col span={7} style={{ paddingLeft: "10px" }} className="custom-col">
            <Row>
              <Col span={24} style={{ paddingBottom: 0 }}>
                <Form>
                  <Form.Item label="Status:" {...inlineFormLayout}>
                    <Select defaultValue={"1"}>
                      <Select.Option value="0">Send</Select.Option>
                      <Select.Option value="1">Verification</Select.Option>
                      <Select.Option value="2">Donating</Select.Option>
                      <Select.Option value="3">Finish</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
              <Button danger style={{ width: "100%" }}>
                Reject donation
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DonationDetailPage;
