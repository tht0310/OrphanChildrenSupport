import * as React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  message,
  Modal,
  Popover,
  Row,
  Space,
  Steps,
  Table,
  Tag,
  Tooltip,
} from "antd";

import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { useState } from "react";
import {
  CalendarOutlined,
  EditOutlined,
  HomeOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { IRegisterModel } from "@Models/ILoginModel";
import { Link } from "react-router-dom";
import { CustomColumnType } from "@Components/forms/Table";
import ReportService from "@Services/ReportService";
import { IReportFieldModel } from "@Models/IReportFieldModel";
import ReportFieldService from "@Services/ReportFieldService";
import { IReportDetailModel, IReportModel } from "@Models/IReportModel";
import { displayDate } from "@Services/FormatDateTimeService";
import TextEditor from "@Components/shared/TextEditor";
import { getStatus, getTagColor } from "@Services/FormatStatusService";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data?: IReportModel;
  currentUser: IRegisterModel;
}
const options = [
  { name: "Full Name", value: "fullName" },
  { name: "Birthday", value: "dob" },
  { name: "Address", value: "detailAddress" },
  { name: "Gender", value: "gender" },
  { name: "Circumstance", value: "circumstance" },
  { name: "Guardian Name", value: "guardianName" },
  { name: "Other", value: "other" },
];
const childrenProfileService = new ChildrenProfileService();
const reportService = new ReportService();
const reportFieldService = new ReportFieldService();

const ReportInformationModal: React.FC<IProps> = ({
  visible,
  onCancel,
  data,
  currentUser,
}: IProps) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [childrenProfiles, setchildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [fields, setFields] = React.useState<IReportFieldModel[]>([]);
  const { Step } = Steps;

  React.useEffect(() => {
    if (visible) {
      form.resetFields();
      fetchChildrenProfile();
      fetchField();
      if (data) {
      }
    }
  }, [data, visible]);

  React.useEffect(() => {
    if (data) {
      getImage(data.id);
    } else {
      setImageUrl(null);
    }
  }, [data]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  async function fetchChildrenProfile() {
    const dataRes = await childrenProfileService.getAll();
    if (!dataRes.hasErrors) {
      setchildrenProfiles(dataRes.value.items);
    }
  }

  function findUserbyId(id: number, list) {
    let index;
    if (id) {
      index = list.findIndex((item) => id === item.id);
    }
    return index;
  }

  function convertPublicAddressToString(address: string) {
    let tempAddress = [];
    let result = "";
    if (address) {
      tempAddress = address.split("-");
      tempAddress.reverse();
      tempAddress.map((v) => {
        result += v + " ";
      });
    }

    return result;
  }

  async function fetchField() {
    const dataRes = await reportFieldService.getAll();
    if (!dataRes.hasErrors) {
      setFields(dataRes.value.items);
    }
  }

  function findNamebyId(id) {
    let result = "";
    fields.map((o) => {
      if (o.id === id) {
        result = o.title;
      }
    });
    return result;
  }

  function getRequestValue(fieldId: number, text: any) {
    const name = findNamebyId(fieldId);
    if (name === "other") {
      return "";
    }

    if (name === "dob") {
      text = displayDate(text);
    }
    if (name === "gender") {
      text = text === "0" ? "Boy" : "Girl";
    }
    if (name === "detailAddress") {
      text = convertPublicAddressToString(text);
    }
    if (name === "circumstance") {
      return (
        <div className="text-editor-read-only">
          <Tooltip
            placement="topLeft"
            title={<TextEditor value={text} readingMode />}
          >
            <Button style={{ border: "none", fontSize: "13px" }}>
              Hover to see detail...
            </Button>
          </Tooltip>
        </div>
      );
    }
    return <div>{text}</div>;
  }

  function findName(v) {
    let result = "";
    options.map((o) => {
      if (o.value === v) {
        result = o.name;
      }
    });
    return result;
  }

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      dataIndex: "age",
      key: "age",
      width: "6%",
      render: (text, row, index) => index + 1,
    },
    {
      title: "Title",
      key: "reportFieldCategoryId",
      dataIndex: "reportFieldCategoryId",
      align: "center",
      width: "15%",
      render: (text: string) => (
        <div className="">{findName(findNamebyId(text))}</div>
      ),
    },

    {
      title: "Report value",
      dataIndex: "reportInformation",
      align: "center",
      key: "reportInformation",
      width: "30%",
      render: (text: string, row: IReportDetailModel) => (
        <>
          {row.status !== 1 && (
            <div>{getRequestValue(row.reportFieldCategoryId, text)}</div>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "status",
      width: "20%",
      render: (text, row: IReportDetailModel, index) => (
        <Tag color={getTagColor(row.status)}>{getStatus(text)}</Tag>
      ),
    },
  ];

  async function onCancelReport() {
    data.status = 3;
    const res = await reportService.update(data);
    if (!res.hasErrors) {
      message.success("Cancel report successfully");
      onCancel();
    } else {
      message.success("An error occured during cancelation");
    }
  }

  async function getImage(id) {
    const avatarUrl = await childrenProfileService.getImage(id);
    if (!avatarUrl.hasErrors) {
      setImageUrl(avatarUrl.value.toString());
    } else {
      setImageUrl(null);
    }
  }

  const customDot = (dot, { status, index }) => (
    <Popover content={<span>15/05/2018</span>}>{dot}</Popover>
  );

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      footer={null}
      width={1000}
      className="antd-modal-custom childrenConfirmation--model"
      style={{ top: 15, height: "300px" }}
      bodyStyle={{
        overflowY: "scroll",
        height: "calc(100vh - 40px)",
        padding: "4%",
      }}
    >
      <div style={{ marginTop: "15px" }}>
        <Row>
          <Col span={17}>
            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
              layout="horizontal"
            >
              <Card
                size="small"
                title={
                  <Space>
                    Processing -
                    <span style={{ color: "#686868", paddingRight: "5px" }}>
                      {getStatus(data?.status).toLocaleLowerCase()}
                    </span>
                  </Space>
                }
                style={{ marginRight: "15px", boxShadow: "none" }}
              >
                <Steps
                  style={{ marginTop: "12px" }}
                  status={
                    data?.status === 2 || data?.status === 3
                      ? "error"
                      : "process"
                  }
                  current={data?.status === 1 ? 2 : 1}
                  progressDot={customDot}
                >
                  <Step title="Send" />
                  <Step title="Waiting for approval" />
                  <Step title="Finish" />
                </Steps>
              </Card>
              <Card
                size="small"
                title="Report detail"
                style={{
                  marginRight: "15px",
                  boxShadow: "none",
                  marginTop: "15px",
                }}
              >
                <Table
                  columns={requestColumns}
                  pagination={false}
                  dataSource={data?.reportDetails}
                />
              </Card>
            </Form>
          </Col>

          <Col span={7}>
            <Card
              size="small"
              title="Reporter Information"
              extra={
                <Link to="/myaccount">
                  <EditOutlined style={{ color: "#e57905" }} />
                </Link>
              }
            >
              <div style={{ marginBottom: "5px" }}>
                <Space size={10}>
                  <div>{currentUser?.fullName}</div>
                </Space>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Space size={10}>
                  <WhatsAppOutlined style={{ color: "#b2b2b2" }} />
                  <div>{currentUser?.phoneNumber}</div>
                </Space>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Space size={10}>
                  <HomeOutlined style={{ color: "#b2b2b2" }} />
                  <div>
                    {convertPublicAddressToString(currentUser?.address)}
                  </div>
                </Space>
              </div>
              <div>
                <Space size={10}>
                  <MailOutlined style={{ color: "#b2b2b2" }} />
                  <div>{currentUser?.email}</div>
                </Space>
              </div>
            </Card>
            <Card style={{ marginTop: "15px" }} size="small" title="Children">
              <div style={{ marginBottom: "5px" }}>
                <Space size={10}>
                  <div>
                    {
                      childrenProfiles[
                        findUserbyId(data?.childrenProfileId, childrenProfiles)
                      ]?.fullName
                    }
                  </div>
                  <div>-</div>
                  <div>
                    {childrenProfiles[
                      findUserbyId(data?.childrenProfileId, childrenProfiles)
                    ]?.gender
                      ? "Boy"
                      : "Girl"}
                  </div>
                </Space>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Space size={10}>
                  <CalendarOutlined style={{ color: "#b2b2b2" }} />
                  <div>
                    {displayDate(
                      childrenProfiles[
                        findUserbyId(data?.childrenProfileId, childrenProfiles)
                      ]?.dob
                    )}
                  </div>
                </Space>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Space size={10}>
                  <HomeOutlined style={{ color: "#b2b2b2" }} />
                  <div>
                    {convertPublicAddressToString(
                      childrenProfiles[
                        findUserbyId(data?.childrenProfileId, childrenProfiles)
                      ]?.publicAddress
                    )}
                  </div>
                </Space>
              </div>
            </Card>

            <Button
              onClick={onCancelReport}
              disabled={data?.status === 0 ? false : true}
              style={{
                marginTop: "15px",
                width: "100%",
                background: "#e57905",
                color: "white",
                lineHeight: "18px",
                fontSize: "15px",
                border: "none",
                padding: "5px 0px",
              }}
            >
              Cancel report
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ReportInformationModal;
