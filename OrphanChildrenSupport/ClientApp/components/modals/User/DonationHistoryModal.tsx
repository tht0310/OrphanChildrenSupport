import * as React from "react";
import {
  Button,
  Card,
  Col,
  Form,
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

import {
  CalendarOutlined,
  EditOutlined,
  HomeOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { IRegisterModel } from "@Models/ILoginModel";
import { Link } from "react-router-dom";
import { CustomColumnType } from "@Components/forms/Table";
import { IDonationModel } from "@Models/IDonationModel";
import { displayDate } from "@Services/FormatDateTimeService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import SupportCategoryService from "@Services/SupportCategoryService";
import DonationService from "@Services/DonationService";
import { getStatus, getTagColor } from "@Services/FormatStatusService";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data?: IDonationModel;
  currentUser: IRegisterModel;
}

const childrenService = new ChildrenProfileService();
const supportCategoriesService = new SupportCategoryService();
const donationService = new DonationService();

const DonationHistoryModal: React.FC<IProps> = ({
  visible,
  onCancel,
  data,
  currentUser,
}: IProps) => {
  const [form] = Form.useForm();

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
    data.status = 3;
    const res = await donationService.update(data);
    if (!res.hasErrors) {
      message.success("Cancel donation successfully");
      onCancel();
    } else {
      message.success("An error occured during cancelation");
    }
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
      width: "20%",
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
      width: "45%",
    },
    {
      title: "Status",
      align: "center",
      dataIndex: "status",
      key: "status",
      width: "22%",
      render: (text, row, index) => (
        <Tag color={getTagColor(text)}>{getStatus(text)}</Tag>
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
  const customDot = (dot, { status, index }) => <Popover>{dot}</Popover>;

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
                      {getStatus(data?.status).toLocaleLowerCase()}
                    </span>
                  </Space>
                }
                style={{ marginRight: "15px", boxShadow: "none" }}
              >
                <Steps
                  style={{ marginTop: "12px", padding: "25px 0 10px 0" }}
                  status={
                    data?.status === 3 || data?.status === 4
                      ? "error"
                      : "process"
                  }
                  current={data?.status === 2 ? 3 : data?.status === 0 ? 1 : 2}
                  progressDot={customDot}
                >
                  <Steps.Step title="Send" />
                  <Steps.Step title="Waiting for approval" />
                  <Steps.Step title="Processing" />
                  <Steps.Step title="Finish" />
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
              title="Supporter"
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
                disabled={data?.status === 0 ? false : true}
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
                Cancel
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default DonationHistoryModal;
