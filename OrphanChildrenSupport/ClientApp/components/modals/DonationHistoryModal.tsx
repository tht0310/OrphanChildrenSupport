import * as React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
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

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data?: IChildrenProfileModel;
  currentUser: IRegisterModel;
}

const childrenProfileService = new ChildrenProfileService();

const DonationHistoryModal: React.FC<IProps> = ({
  visible,
  onCancel,
  data,
  currentUser,
}: IProps) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [imageFile, setImageFile] = useState<UploadFile<any>>();
  let colorIndex = 1;
  const { Step } = Steps;

  React.useEffect(() => {
    if (visible) {
      form.resetFields();
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

  const requestColumns: CustomColumnType[] = [
    {
      title: "",
      ellipsis: true,
      width: "8%",
      align: "center",
      render: (text, row, index) => index + 1,
    },
    {
      title: "",
      dataIndex: "title",
      ellipsis: true,
      width: "16%",
      render: (text) => {
        colorIndex += 1;
        return (
          <Tag
            style={{
              width: "100%",
              textAlign: "center",
            }}
            color={colors[colorIndex]}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      title: "",
      width: "50%",
      render: (text, row) => (
        <>
          {row.title === "Money" ? (
            <InputNumber
              required
              style={{ width: "100%", fontSize: "12px" }}
              placeholder="Input money "
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          ) : (
            <Input
              required
              placeholder="Input detail"
              maxLength={25}
              style={{ fontSize: "12px" }}
            />
          )}
        </>
      ),
    },
  ];

  async function getImage(id) {
    const avatarUrl = await childrenProfileService.getImage(id);
    if (!avatarUrl.hasErrors) {
      setImageUrl(avatarUrl.value.toString());
    } else {
      setImageUrl(null);
    }
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
        height: "calc(100vh - 30px)",
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
                title="Processing"
                style={{ marginRight: "15px", boxShadow: "none" }}
              >
                <Steps
                  style={{ marginTop: "12px" }}
                  current={1}
                  progressDot={customDot}
                >
                  <Step title="Send" />
                  <Step title="Verification" />
                  <Step title="Confirming" />
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
                <Table columns={requestColumns} pagination={false} />
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
                    {convertPublicAddressToString(currentUser?.detailAddress)}
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
                  <div>{"Nguyễn Ngọc Linh"}</div>
                  <div>-</div>
                  <div>{"Girl"}</div>
                </Space>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Space size={10}>
                  <CalendarOutlined style={{ color: "#b2b2b2" }} />
                  <div>{"10/07/2019"}</div>
                </Space>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <Space size={10}>
                  <HomeOutlined style={{ color: "#b2b2b2" }} />
                  <div>{"Củ Chi - TPHCM"}</div>
                </Space>
              </div>
            </Card>
            <Card style={{ marginTop: "15px" }} size="small" title="Note">
              Please contact me before 12:00 PM
            </Card>
            <Button
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
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default DonationHistoryModal;
