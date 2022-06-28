import {
  CheckCircleOutlined,
  CloseSquareOutlined,
  DashboardOutlined,
  FormOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import DonationDetailModal from "@Components/modals/Admin/DonationDetailModal";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IDonationDetailModel, IDonationModel } from "@Models/IDonationModel";
import { IRegisterModel } from "@Models/ILoginModel";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import AccountService from "@Services/AccountService";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import DonationDetailService from "@Services/DonationDetailService";
import DonationService from "@Services/DonationService";
import {
  getStatus,
  getTagColor,
  renderClassName,
} from "@Services/FormatStatusService";
import SupportCategoryService from "@Services/SupportCategoryService";
import {
  Button,
  Card,
  Col,
  Form,
  Popconfirm,
  Popover,
  Row,
  Select,
  Space,
  Steps,
  StepsProps,
  Table,
  Tag,
  Image,
  message,
} from "antd";
import * as React from "react";
import { Edit2, Trash2 } from "react-feather";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{ id: string }>;

const childrenService = new ChildrenProfileService();
const supportCategoriesService = new SupportCategoryService();
const userService = new AccountService();
const donationService = new DonationService();
const donationDetailService = new DonationDetailService();

const DonationDetailPage: React.FC<Props> = ({ match, history }: Props) => {
  const [form] = Form.useForm();
  const [children, setChildren] = React.useState<IChildrenProfileModel>();
  const [user, setUser] = React.useState<IRegisterModel>(null);
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const [donation, setDonation] = React.useState<IDonationModel>();
  const [modelForEdit, setModelForEdit] =
    React.useState<IDonationDetailModel>();
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [donationDetail, setDonationDetail] = React.useState<
    IDonationDetailModel[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.title = "Admin - Donation Detail | FOR THE CHILDREN";
    fetchDonation();
    fetchSupportCategories();
  }, []);

  React.useEffect(() => {
    if (donation) {
      fetchData();
      form.setFieldsValue({ status: donation?.status });
    }
  }, [donation]);

  function fetchData() {
    fetchChildren(donation.childrenProfileId);
    fetchUser(donation.accountId);
  }

  async function fetchDonation() {
    setIsLoading(true);
    const res = await donationService.getDonation(Number(match.params.id));
    if (!res.hasErrors) {
      setDonation(res.value);
    }
    setIsLoading(false);
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

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  function findNamebyId(id: number, list) {
    const index = list.findIndex((item) => id === item.id);
    return index;
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

  function toggleModal() {
    setIsModal(!isModal);
  }

  async function onApproveDonation(id) {
    const res = await donationService.approveDonation(id);
    if (!res.hasErrors) {
      fetchDonation();
      message.success("Approve donation sucessfully");
    } else {
      message.error("An error occured during updation");
    }
  }

  async function onCancelDonation(id) {
    const res = await donationService.cancelDonation(id);
    if (!res.hasErrors) {
      fetchDonation();
      message.success("Cancel donation sucessfully");
    } else {
      message.error("An error occured during cancelation");
    }
  }

  async function onRejectDonation(id) {
    const res = await donationService.rejectDonation(id);
    if (!res.hasErrors) {
      fetchDonation();
      message.success("Reject donation sucessfully");
    } else {
      message.error("An error occured during reject");
    }
  }

  async function onApproveDonationDetail(id) {
    const res = await donationDetailService.approveDonationDetail(id);
    if (!res.hasErrors) {
      fetchDonation();
      message.success("Approve donation sucessfully");
    } else {
      message.error("An error occured during updation");
    }
  }

  async function onCancelDonationDetail(id) {
    const res = await donationDetailService.cancelDonationDetail(id);
    if (!res.hasErrors) {
      fetchDonation();
      message.success("Cancel donation sucessfully");
    } else {
      message.error("An error occured during cancelation");
    }
  }

  async function onRejectDonationDetail(id) {
    const res = await donationDetailService.rejectDonationDetail(id);

    if (!res.hasErrors) {
      fetchDonation();
      message.success("Reject donation sucessfully");
    } else {
      message.error("An error occured during reject");
    }
  }

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      dataIndex: "age",
      key: "age",
      width: "5%",
      align: "center",
      render: (text, row, index) => index + 1,
    },
    {
      title: "Title",
      key: "supportCategoryId",
      dataIndex: "supportCategoryId",
      align: "center",
      width: "15%",
      render: (text, row, index) => (
        <a className="item-title" onClick={toggleModal}>
          {findNamebyId(row.supportCategoryId, supportCategories) >= 0
            ? supportCategories[
                findNamebyId(row.supportCategoryId, supportCategories)
              ].title
            : ""}
        </a>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: "25%",
    },
    {
      title: "Status",
      align: "center",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (text, row: IDonationDetailModel, index) =>
        getStatus(text) === "" ? (
          <></>
        ) : (
          <Tag color={getTagColor(row.status)}>{getStatus(text)}</Tag>
        ),
    },
    {
      title: "Image",
      align: "center",
      dataIndex: "address",
      key: "address",
      render: (text, row: IDonationDetailModel, index) =>
        row.imagePath ? (
          <Image
            width={100}
            src={`${donationDetailService.getImageUrl(row.id)}?${Date.now()}`}
          />
        ) : (
          <></>
        ),
    },
    {
      title: "",
      dataIndex: "",
      width: donation?.status === 1 ? "10%" : "0%",
      key: "",
      render: (text, row: IDonationDetailModel) => (
        <>
          {row.status === 1 && (
            <Space className="actions">
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                onConfirm={() => onApproveDonationDetail(row?.id)}
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
                onConfirm={() => onRejectDonationDetail(row?.id)}
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
                onConfirm={() => onCancelDonationDetail(row?.id)}
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
    <div
      className="table-container donation-detail"
      style={{ minHeight: "400px" }}
    >
      <div style={{ padding: "6px 20px" }}>
        <span>
          <h6>
            <Row>
              <Col span={16}>
                <span>
                  Donation
                  <span style={{ color: "red", margin: "0px 10px" }}>
                    #DN{10000 + donation?.id}
                  </span>
                </span>
              </Col>
              <Col span={8} style={{ textAlign: "right" }}>
                <span style={{ color: "#707070", margin: "0px 10px" }}>
                  <DashboardOutlined className="antd-ic-custom" />
                  {getStatus(donation?.status)}
                </span>
              </Col>
            </Row>
          </h6>
        </span>

        <Steps
          style={{ marginTop: "12px", padding: "25px 0 10px 0" }}
          status={
            donation?.status === 3 || donation?.status === 4
              ? "error"
              : "process"
          }
          current={donation?.status === 2 ? 3 : donation?.status === 0 ? 1 : 2}
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
                    Supporter Information
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
              rowClassName={(record: IDonationDetailModel, index) =>
                renderClassName(record?.status)
              }
              columns={requestColumns}
              dataSource={donation?.donationDetails}
              pagination={false}
              onRow={(record) => {
                return {
                  onClick: (event) => {
                    setModelForEdit(record);
                  },
                };
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "5px" }}>
          <Col span={24} style={{ marginRight: "10px", marginBottom: "20px" }}>
            <Card>
              <h6
                style={{
                  fontSize: "14px",
                  paddingTop: "10px",
                  color: "#e57905",
                }}
              >
                <FormOutlined
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    marginLeft: "5px",
                    color: "#e57905",
                  }}
                  className="antd-icon-custom"
                />
                <span style={{ fontWeight: "normal", color: "black" }}>
                  {donation?.note}
                </span>
              </h6>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Space style={{ marginTop: "8px", float: "right" }}>
              {donation?.status === 0 && (
                <>
                  <span style={{ paddingRight: "8px" }}>
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onApproveDonation(donation?.id)}
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
              {donation?.status === 0 && (
                <>
                  <span style={{ paddingRight: "8px" }}>
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onRejectDonation(donation?.id)}
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
                </>
              )}

              {donation?.status !== 2 && donation?.status !== 4 && (
                <>
                  <span style={{ paddingRight: "8px" }}>
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => onCancelDonation(donation?.id)}
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
      <DonationDetailModal
        visible={isModal}
        onCancel={toggleModal}
        data={modelForEdit}
        donation={donation}
        fetchDonation={fetchDonation}
      />
    </div>
  );
};

export default DonationDetailPage;
