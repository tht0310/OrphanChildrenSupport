import * as React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Popover,
  Row,
  Space,
  Steps,
  Table,
  Tag,
} from "antd";

import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { useState } from "react";
import { UploadFile } from "antd/lib/upload/interface";
import {
  CalendarOutlined,
  EditOutlined,
  HomeOutlined,
  LoadingOutlined,
  MailOutlined,
  SendOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { IRegisterModel } from "@Models/ILoginModel";
import { Link } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import { CustomColumnType } from "@Components/forms/Table";
import { colors } from "@Components/shared/TagColor";
import { IDonationDetailModel, IDonationModel } from "@Models/IDonationModel";
import { displayDate } from "@Services/FormatDateTimeService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import SupportCategoryService from "@Services/SupportCategoryService";
import DonationService from "@Services/DonationService";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data?: IDonationModel;
  currentUser: IRegisterModel;
}

const childrenService = new ChildrenProfileService();
const childrenProfileService = new ChildrenProfileService();
const supportCategoriesService = new SupportCategoryService();
const donationService = new DonationService();

const DonationHistoryModal: React.FC<IProps> = ({
  visible,
  onCancel,
  data,
  currentUser,
}: IProps) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [imageFile, setImageFile] = useState<UploadFile<any>>();
  const [childrenProfiles, setchildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const { Step } = Steps;

  React.useEffect(() => {
    if (visible) {
      fetchChildrenProfile();
      fetchSupportCategories();
      form.resetFields();
      if (data) {
      }
    }
  }, [data, visible]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  async function onCancelDonation() {
    data.donationStatus = 3;
    const res = await donationService.update(data);
    if (!res.hasErrors) {
      message.success("Cancel donation successfully");
      onCancel();
    } else {
      message.success("An error occured during cancelation");
    }
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

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }
  async function fetchChildrenProfile() {
    const dataRes = await childrenService.getAll();
    if (!dataRes.hasErrors) {
      setchildrenProfiles(dataRes.value.items);
    }
  }

  function renderTagColor(status) {
    let result = "";
    if (status === 0) {
      result = "blue";
    }
    if (status === 1) {
      result = "green";
    }
    if (status === 2 || status === 3) {
      result = "red";
    }
    return result;
  }

  function findNamebyId(id: number, list) {
    const index = list.findIndex((item) => id === item.id);
    return index;
  }

  function findUserbyId(id: number, list) {
    let index;
    if (id) {
      index = list.findIndex((item) => id === item.id);
    }
    return index;
  }

  const requestColumns: CustomColumnType[] = [
    {
      title: "",
      ellipsis: true,
      width: "8%",
      align: "center",
      render: (text, row, index) => index + 1,
    },
    {
      title: "Title",
      key: "supportCategoryId",
      dataIndex: "supportCategoryId",
      align: "center",
      width: "25%",
      render: (text, row, index) =>
        findNamebyId(row.supportCategoryId, supportCategories) >= 0
          ? supportCategories[
              findNamebyId(row.supportCategoryId, supportCategories)
            ].title
          : "",
    },

    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      width: "30%",
    },
    {
      title: "Status",
      align: "center",
      dataIndex: "donationDetailStatus",
      key: "donationDetailStatus",
      width: "30%",
      render: (text, row, index) => (
        <Tag color={renderTagColor(text)}>{getStatus(text)}</Tag>
      ),
    },
  ];

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
      style={{ top: 25, height: "300px" }}
      bodyStyle={{
        overflowY: "scroll",
        height: "calc(100vh - 60px)",
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
                      {getStatus(data?.donationStatus).toLocaleLowerCase()}
                    </span>
                  </Space>
                }
                style={{ marginRight: "15px", boxShadow: "none" }}
              >
                <Steps
                  style={{ marginTop: "12px" }}
                  status={
                    data?.donationStatus === 2 || data?.donationStatus === 3
                      ? "error"
                      : "process"
                  }
                  current={data?.donationStatus === 1 ? 2 : 1}
                  progressDot={customDot}
                >
                  <Step title="Send" />
                  <Step title="Waiting for approval" />
                  <Step title="Finish" />
                </Steps>
              </Card>
              <Card
                size="small"
                title="Support detail"
                style={{
                  marginRight: "15px",
                  boxShadow: "none",
                  marginTop: "15px",
                }}
              >
                <Table
                  className="custom-table"
                  columns={requestColumns}
                  dataSource={data?.donationDetails}
                  pagination={false}
                />
              </Card>
            </Form>
          </Col>

          <Col span={7} style={{ paddingRight: "0" }}>
            <Card
              size="small"
              title="Supporter Information"
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
            </Card>
            <Card
              style={{ marginTop: "15px" }}
              size="small"
              title="Children Information"
            >
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
            <Card style={{ marginTop: "15px" }} size="small" title="Note">
              {data?.note}
            </Card>
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onCancelDonation()}
            >
              <Button
                onClick={onCancelDonation}
                disabled={data?.donationStatus === 0 ? false : true}
                style={{
                  marginTop: "15px",
                  width: "100%",
                  background: "#e57905",
                  color: "white",
                  lineHeight: "18px",
                  fontSize: "15px",
                  border: "none",
                }}
              >
                Cancel donation
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default DonationHistoryModal;
