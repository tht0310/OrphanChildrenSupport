import { FormOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import DonationDetailModal from "@Components/modals/DonationDetailModal";
import { colors } from "@Components/shared/TagColor";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IDonationDetailModel, IDonationModel } from "@Models/IDonationModel";
import { IRegisterModel } from "@Models/ILoginModel";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import AccountService from "@Services/AccountService";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import DonationDetailService from "@Services/DonationDetailService";
import DonationService from "@Services/DonationService";
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
  Upload,
  Image,
  message,
} from "antd";
import * as React from "react";
import { Edit2, Trash2 } from "react-feather";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{ id: string }>;

const inlineFormLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 18,
  },
};

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

  React.useEffect(() => {
    document.title = "Donation Detail";
    fetchDonation();
    fetchSupportCategories();
  }, []);

  React.useEffect(() => {
    if (donation) {
      fetchData();
      form.setFieldsValue({ status: donation?.donationStatus.toString() });
    }
  }, [donation]);

  function fetchData() {
    fetchChildren(donation.childrenProfileId);
    fetchUser(donation.accountId);
  }

  async function fetchDonation() {
    const res = await donationService.getDonation(Number(match.params.id));
    if (!res.hasErrors) {
      setDonation(res.value);
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

  async function onUpdateStatus(value) {
    const tempValue = donation;
    tempValue.donationStatus = value;
    const res = await donationService.update(tempValue);
    if (!res.hasErrors) {
      message.success("Update donation status successfully");
      fetchDonation();
    } else {
      message.error("An error occured during update");
    }
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

  function onSubmit() {
    form.submit();
  }

  function getStatus(id: number) {
    let name = "";
    switch (id) {
      case 0:
        name = "Waiting For Approval";
        break;
      case 1:
        name = "Approved";
        break;
      case 2:
        name = "Rejected";
        break;
      case 3:
        name = "Canceled";
        break;
    }
    return name;
  }

  async function handleDelete(id: number) {
    const res = await donationDetailService.delete(id);
    if (!res.hasErrors) {
      message.success("Delete donation sucessfully");
      fetchDonation();
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
        <Tag color={colors[index]}>
          {findNamebyId(row.supportCategoryId, supportCategories) >= 0
            ? supportCategories[
                findNamebyId(row.supportCategoryId, supportCategories)
              ].title
            : ""}
        </Tag>
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
      dataIndex: "donationDetailStatus",
      key: "donationDetailStatus",
      width: "20%",
      render: (text, row: IDonationDetailModel, index) => getStatus(text),
    },
    {
      title: "Image",
      align: "center",
      dataIndex: "address",
      key: "address",
      width: "20%",
      render: (text, row: IDonationDetailModel, index) => <Image />,
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "10%",
      render: (text, row: IDonationDetailModel) => (
        <>
          <Space className="actions">
            <Button
              className="btn-custom-2 blue-action-btn"
              icon={
                <Edit2
                  size={14}
                  style={{ color: "#40A9FF" }}
                  onClick={toggleModal}
                />
              }
            />
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              onConfirm={() => handleDelete(row.id)}
              cancelText="No"
            >
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

  async function handleOnSubmit(value) {
    onUpdateStatus(value.status);
  }

  return (
    <div className="table-container">
      <div style={{ padding: "6px 20px" }}>
        <span>
          <h6>
            <Row>
              <Col span={16}>
                {" "}
                <span>
                  Donation Number{" "}
                  <span style={{ color: "red" }}>
                    #DN{10000 + donation?.id}
                  </span>
                </span>
              </Col>

              <Col span={8} style={{ paddingBottom: 0 }}>
                <Form
                  onFinish={handleOnSubmit}
                  form={form}
                  style={{ float: "right" }}
                  layout="inline"
                >
                  <Form.Item name="status">
                    <Select style={{ width: "150px" }}>
                      <Select.Option value="0">
                        Waiting for approval
                      </Select.Option>
                      <Select.Option value="1">Approved</Select.Option>
                      <Select.Option value="2">Rejected</Select.Option>
                      <Select.Option value="3">Canceled</Select.Option>
                    </Select>
                  </Form.Item>
                  <Button onClick={onSubmit} type="primary" ghost>
                    Save
                  </Button>
                </Form>
              </Col>
            </Row>
          </h6>
        </span>

        <Steps
          style={{ marginTop: "12px", padding: "25px 0 10px 0" }}
          status={
            donation?.donationStatus === 2 || donation?.donationStatus === 3
              ? "error"
              : "process"
          }
          current={donation?.donationStatus === 1 ? 2 : 1}
          progressDot={customDot}
        >
          <Steps.Step title="Send" />
          <Steps.Step title="Waiting for approval" />
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
                    {user?.fullName}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    (+84) {user?.phoneNumber}
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
                    {children?.fullName}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    (+84) {children?.guardianPhoneNumber.substring(1)}
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
                  Note: {donation?.note}
                </span>
              </h6>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "8px" }}>
          <Col span={14}></Col>
          <Col span={5} style={{ paddingRight: "8px" }}>
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onUpdateStatus(2)}
            >
              <Button danger style={{ width: "100%", height: "40px" }}>
                Reject donation
              </Button>
            </Popconfirm>
          </Col>
          <Col span={5}>
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onUpdateStatus(3)}
            >
              <Button
                danger
                type="primary"
                style={{ paddingLeft: "8px", width: "100%", height: "40px" }}
              >
                Cancel donation
              </Button>
            </Popconfirm>
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
