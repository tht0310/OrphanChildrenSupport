import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  DashboardOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import ReportDetailModal from "@Components/modals/Admin/ReportDetailModel";
import UpdateStatusModal from "@Components/modals/Admin/UpdateStatusModal";
import {
  lowercaseFirstLetter,
  options,
} from "@Components/shared/ReportFieldOptions";
import TextEditor from "@Components/shared/TextEditor";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IRegisterModel } from "@Models/ILoginModel";
import { IReportFieldModel } from "@Models/IReportFieldModel";
import { IReportDetailModel, IReportModel } from "@Models/IReportModel";
import AccountService from "@Services/AccountService";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { displayDate } from "@Services/FormatDateTimeService";
import {
  getStatus,
  getTagColor,
  renderClassName,
} from "@Services/FormatStatusService";
import ReportDetailService from "@Services/ReportDetailService";
import ReportFieldService from "@Services/ReportFieldService";
import ReportService from "@Services/ReportService";
import {
  Button,
  Card,
  Col,
  Form,
  message,
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
  Tooltip,
} from "antd";

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{ id: string }>;

const reportService = new ReportService();
const childrenService = new ChildrenProfileService();
const userService = new AccountService();
const reportFieldService = new ReportFieldService();
const reportDetailService = new ReportDetailService();

const ReportDetailPage: React.FC<Props> = ({ match, history }: Props) => {
  const [form] = Form.useForm();
  const [report, setReport] = React.useState<IReportModel>();
  const [children, setChildren] = React.useState<IChildrenProfileModel>();
  const [user, setUser] = React.useState<IRegisterModel>(null);
  const [fields, setFields] = React.useState<IReportFieldModel[]>([]);
  const [isReportDetailModal, setReportDetailModal] =
    React.useState<boolean>(false);
  const [modelForEdit, setModelForEdit] = React.useState<IReportDetailModel>();
  const [isUpdateStatus, setUpdateStatus] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.title = "Admin - Report Detail | FOR THE CHILDREN";
    fetchReport();
  }, []);

  React.useEffect(() => {
    if (report) {
      form.setFieldsValue({ status: report?.status.toString() });
      fetchData();
    }
  }, [report]);

  function fetchData() {
    fetchChildren(report.childrenProfileId);
    fetchUser(report.accountId);
    fetchField();
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

  function findNamebyId(id) {
    let result = "";
    fields.map((o) => {
      if (o.id === id) {
        result = o.title;
      }
    });
    return result;
  }

  async function fetchField() {
    const dataRes = await reportFieldService.getAll();
    if (!dataRes.hasErrors) {
      setFields(dataRes.value.items);
    }
  }

  async function fetchReport() {
    const res = await reportService.getReport(Number(match.params.id));
    if (!res.hasErrors) {
      setReport(res.value);
    }
  }

  async function fetchChildren(id: number) {
    const res = await childrenService.getChildren(id);
    if (!res.hasErrors) {
      setChildren(res.value);
    }
  }

  async function fetchUser(id: number) {
    const res = await userService.getAccount(id);
    if (!res.hasErrors) {
      setUser(res.value);
    }
  }

  async function onApproveReport(id) {
    const res = await reportService.approveReport(id);
    if (!res.hasErrors) {
      fetchReport();
      message.success("Approve report sucessfully");
    } else {
      message.error("An error occured during updation");
    }
  }

  async function onCancelReport(id) {
    const res = await reportService.cancelReport(id);
    if (!res.hasErrors) {
      fetchReport();
      message.success("Cancel report sucessfully");
    } else {
      message.error("An error occured during cancelation");
    }
  }

  async function onRejectReport(id) {
    const res = await reportService.rejectReport(id);
    if (!res.hasErrors) {
      fetchReport();

      message.success("Reject report sucessfully");
    } else {
      message.error("An error occured during reject");
    }
  }

  async function onApproveReportDetail(id) {
    const res = await reportDetailService.approveReportDetail(id);
    if (!res.hasErrors) {
      fetchReport();
      message.success("Approve report sucessfully");
    } else {
      message.error("An error occured during updation");
    }
  }

  async function onCancelReportDetail(id) {
    const res = await reportDetailService.cancelReportDetail(id);
    if (!res.hasErrors) {
      fetchReport();
      message.success("Cancel report sucessfully");
    } else {
      message.error("An error occured during cancelation");
    }
  }

  async function onRejectReportDetail(id) {
    const res = await reportDetailService.rejectReportDetail(id);
    console.log(res);
    if (!res.hasErrors) {
      fetchReport();
      message.success("Reject report sucessfully");
    } else {
      message.error("An error occured during reject");
    }
  }

  function getCurrentValue(fieldId: number) {
    let name = lowercaseFirstLetter(findNamebyId(fieldId));

    if (name === "dOB") {
      name = "dob";
    }
    let oldValue = children ? children[name] : "";

    if (name === "dob") {
      oldValue = displayDate(oldValue);
    }
    if (name === "gender") {
      oldValue = oldValue ? "Boy" : "Girl";
    }
    if (name === "circumstance") {
      return (
        <div className="text-editor-read-only">
          <Tooltip
            placement="topLeft"
            title={<TextEditor value={oldValue} readingMode />}
          >
            <Button style={{ border: "none", fontSize: "13px" }}>
              Hover to see detail...
            </Button>
          </Tooltip>
        </div>
      );
    }
    return <div>{oldValue}</div>;
  }

  function getRequestValue(fieldId: number, text: any) {
    let name = lowercaseFirstLetter(findNamebyId(fieldId));

    if (name === "dOB") {
      name = "dob";
    }

    if (name === "dob") {
      text = displayDate(text);
    }
    if (name === "gender") {
      text = text === "0" ? "Boy" : "Girl";
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

  function handleCancel() {
    setReportDetailModal(!isReportDetailModal);
  }

  function toggleStatusModel() {
    setUpdateStatus(!isUpdateStatus);
  }

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
      title: "Current Value",
      key: "reportFieldCategoryId",
      dataIndex: "reportFieldCategoryId",
      align: "center",
      width: "30%",
      render: (text: string, row) => (
        <div>{getCurrentValue(row.reportFieldCategoryId)}</div>
      ),
    },
    {
      title: "Report Value",
      dataIndex: "reportInformation",
      align: "center",
      key: "reportInformation",
      width: "30%",
      render: (text: string, row: IReportDetailModel) => (
        <>
          <div>{getRequestValue(row.reportFieldCategoryId, text)}</div>
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
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "10%",
      render: (text, row) => (
        <>
          {row?.status === 1 && (
            <Space className="actions">
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                onConfirm={() => onApproveReportDetail(row?.id)}
                cancelText="No"
              >
                <Button
                  className="btn-custom-2"
                  icon={
                    <CheckCircleOutlined
                      size={16}
                      style={{ color: "#2eb85c" }}
                    />
                  }
                ></Button>
              </Popconfirm>
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                onConfirm={() => onRejectReportDetail(row?.id)}
                cancelText="No"
              >
                <Button
                  className="btn-custom-2 "
                  icon={
                    <CloseSquareOutlined
                      size={16}
                      style={{ color: "#FA6D70" }}
                    />
                  }
                ></Button>
              </Popconfirm>

              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                onConfirm={() => onCancelReportDetail(row?.id)}
                cancelText="No"
              >
                <Button
                  className="btn-custom-2 "
                  icon={<StopOutlined size={16} style={{ color: "#4f5d73" }} />}
                ></Button>
              </Popconfirm>
            </Space>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="table-container">
      <div style={{ padding: "6px 20px" }}>
        <span>
          <h6>
            <Row>
              <Col span={16}>
                <span>
                  Report
                  <span style={{ color: "red", margin: "0px 10px" }}>
                    #RP{10000 + report?.id}
                  </span>
                </span>
              </Col>
              <Col span={8} style={{ textAlign: "right" }}>
                <span style={{ color: "#707070", margin: "0px 10px" }}>
                  <DashboardOutlined className="antd-ic-custom" />
                  {getStatus(report?.status)}
                </span>
              </Col>
            </Row>
          </h6>
        </span>

        <Steps
          style={{ marginTop: "12px", padding: "25px 0 10px 0" }}
          status={
            report?.status === 3 || report?.status === 4 ? "error" : "process"
          }
          current={report?.status === 2 ? 3 : report?.status === 0 ? 1 : 2}
          progressDot={customDot}
        >
          <Steps.Step title="Sent" />
          <Steps.Step title="Waiting For Approval" />
          <Steps.Step title="Processing" />
          <Steps.Step title="Finished" />
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
                    Reporter Information
                  </h6>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    {user?.fullName}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    {user?.phoneNumber}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    {user?.address}
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
                    Children Information
                  </h6>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    {children?.fullName}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    {children?.guardianPhoneNumber}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    {children?.detailAddress}
                  </div>
                </Card>
              </Col>
            </Row>
            <Table
              className="custom-table"
              onRow={(record) => {
                return {
                  onClick: (event) => {
                    setModelForEdit(record);
                  },
                };
              }}
              rowClassName={(record: IReportDetailModel, index) =>
                renderClassName(record?.status)
              }
              columns={requestColumns}
              dataSource={report?.reportDetails}
              pagination={false}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "8px" }}>
          <Col span={24}>
            {" "}
            <Space style={{ marginTop: "8px", float: "right" }}>
              {report?.status === 0 && (
                <>
                  <span style={{ paddingRight: "8px" }}>
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onApproveReport(report?.id)}
                    >
                      <Button
                        style={{
                          paddingLeft: "8px",
                          width: "100%",
                          color: "white",
                          background: "#2eb85c",
                          border: "1px solid #2eb85c",
                        }}
                      >
                        Approve
                      </Button>
                    </Popconfirm>
                  </span>
                </>
              )}
              {report?.status === 0 && (
                <span style={{ paddingRight: "8px" }}>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => onRejectReport(report?.id)}
                  >
                    <Button
                      style={{
                        width: "100%",
                        border: "1px solid #e55353",
                        color: "white",
                        background: "#e55353",
                      }}
                    >
                      Reject
                    </Button>
                  </Popconfirm>
                </span>
              )}

              {report?.status !== 2 && report?.status !== 4 && (
                <>
                  <span style={{ paddingRight: "8px" }}>
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onCancelReport(report?.id)}
                    >
                      <Button
                        style={{
                          paddingLeft: "8px",
                          width: "100%",
                          color: "white",
                          background: "#9da5b1",
                          border: "1px solid #9da5b1",
                        }}
                      >
                        Cancel
                      </Button>
                    </Popconfirm>
                  </span>
                </>
              )}
            </Space>
          </Col>
        </Row>
      </div>
      <ReportDetailModal
        visible={isReportDetailModal}
        data={modelForEdit}
        onCancel={handleCancel}
        children={children}
        reportField={fields}
        fetchData={fetchData}
        label={findName(findNamebyId(modelForEdit?.reportFieldCategoryId))}
      />
      <UpdateStatusModal
        isDonation={false}
        visible={isUpdateStatus}
        dataNumber={modelForEdit?.status}
        onCancel={toggleStatusModel}
        data={modelForEdit}
        fetchData={fetchReport}
      />
    </div>
  );
};

export default ReportDetailPage;
