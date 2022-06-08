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

const DonationDetailPage: React.FC<Props> = ({ match, history }: Props) => {
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
        name = "Cancelle";
        break;
    }
    return name;
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
      render: () => (
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
                <Form style={{ float: "right" }} layout="inline">
                  <Form.Item label="">
                    <Select defaultValue={"1"} style={{ width: "110%" }}>
                      <Select.Option value="0">Send</Select.Option>
                      <Select.Option value="1">Verification</Select.Option>
                      <Select.Option value="2">Donating</Select.Option>
                      <Select.Option value="3">Finish</Select.Option>
                    </Select>
                  </Form.Item>
                  <Button type="primary" ghost>
                    Save
                  </Button>
                </Form>
              </Col>
            </Row>
          </h6>
        </span>

        <Steps
          current={1}
          status="error"
          progressDot={customDot}
          style={{ padding: "35px 35px 10px 35px" }}
        >
          <Steps.Step title="Send" />
          <Steps.Step title="Approved" />
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
                    {user?.fullName}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      marginBottom: "3px",
                    }}
                  >
                    (+84) {user?.phoneNumber.substring(1)}
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
                  Please contact me after 5:00 PM
                </span>
              </h6>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: "8px" }}>
          <Col span={14}></Col>
          <Col span={5} style={{ paddingRight: "8px" }}>
            <Button danger style={{ width: "100%", height: "40px" }}>
              Reject donation
            </Button>
          </Col>
          <Col span={5}>
            <Button
              danger
              type="primary"
              style={{ paddingLeft: "8px", width: "100%", height: "40px" }}
            >
              Cancel donation
            </Button>
          </Col>
        </Row>
      </div>
      <DonationDetailModal
        visible={isModal}
        onCancel={toggleModal}
        data={modelForEdit}
        donation={donation}
      />
    </div>
  );
};

export default DonationDetailPage;
