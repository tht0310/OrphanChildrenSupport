import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  MailOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import { colors } from "@Components/shared/TagColor";

import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IDonationDetailModel, IDonationModel } from "@Models/IDonationModel";
import { IRegisterModel } from "@Models/ILoginModel";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import DonationService from "@Services/DonationService";
import { displayDate } from "@Services/FormatDateTimeService";

import {
  Modal,
  Space,
  Table,
  Tag,
  Col,
  Row,
  Card,
  Form,
  Input,
  InputNumber,
  Button,
  message,
  Popconfirm,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { Link } from "react-router-dom";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  selected: ISupportCategoryModel[];
  children: IChildrenProfileModel;
  currentUser: IRegisterModel;
}

const donationService = new DonationService();
const DonationConfirmationModal: React.FC<IProps> = ({
  visible,
  onCancel,
  children,
  selected,
  currentUser,
}: IProps) => {
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const [form] = Form.useForm();
  const [donationDetail, setDonationDetail] =
    React.useState<IDonationDetailModel[]>();

  React.useEffect(() => {
    document.title = "FOR THE CHILDREN";
  }, []);

  React.useEffect(() => {
    initializeValue(selected);
    setSupportCategories(selected);
  }, [selected]);

  function initializeValue(selected) {
    const tempList = [];
    for (let index = 0; index < selected.length; index++) {
      let element: IDonationDetailModel = {
        supportCategoryId: selected[index].id,
      };
      tempList.push(element);
    }
    setDonationDetail(tempList);
  }

  const onChange = (e: string, index: number, text: string) => {
    const items = [...donationDetail];
    let item = { ...items[index] };
    item = { ...item, [e]: text };
    items[index] = item;
    setDonationDetail(items);
  };

  function onDelete(id: number) {
    let result = donationDetail.filter(function (u) {
      return u.supportCategoryId !== id;
    });
    setDonationDetail(result);
    let tempSelected = supportCategories.filter(function (u) {
      return u.id !== id;
    });
    setSupportCategories(tempSelected);
  }

  const requestColumns: CustomColumnType[] = [
    {
      title: "",
      ellipsis: true,
      width: "12%",
      align: "center",
      render: (text, row, index) => index + 1,
    },
    {
      title: "",
      dataIndex: "title",
      ellipsis: true,
      width: "30%",
      render: (text, row, index) => {
        return <Tag color={colors[index]}>{text}</Tag>;
      },
    },
    {
      title: "",
      width: "48%",
      render: (text, row, index) => (
        <>
          {row.title === "Money" ? (
            <InputNumber
              required
              style={{ width: "85%", fontSize: "12px" }}
              placeholder="Input money "
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
            />
          ) : (
            <Input
              required
              onBlur={(e) => {
                onChange("note", index, e.target.value);
              }}
              placeholder="Input detail"
              style={{ fontSize: "12px", width: "85%" }}
            />
          )}
        </>
      ),
    },
    {
      title: "",
      ellipsis: true,
      align: "center",
      width: "10%",
      render: (text, row, index) => (
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={(e) => onDelete(row.id)}
        >
          <Button style={{ padding: "4px 12px" }}>
            <DeleteOutlined
              style={{ color: "#e57905", marginTop: "5px", fontSize: "15px" }}
            />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  async function onFinish(values: IDonationModel | any) {
    values.donationDetails = donationDetail;
    values.childrenProfileId = children.id;
    values.accountId = currentUser.id;

    const res = await donationService.add(values);
    if (!res.hasErrors) {
      message.success("Donation request has sent successfully.");
      onCancel();
    } else {
      message.error("Fail");
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

  function onSubmit() {
    form.submit();
  }

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={null}
      width={1000}
      title={"Donation Confimation"}
      className="childrenConfirmation--model"
      style={{ top: 30, height: "280px" }}
      bodyStyle={{ overflowY: "scroll", height: "calc(100vh - 130px)" }}
    >
      <Row>
        <Col span={17} style={{ paddingRight: "15px" }}>
          <Form
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
          >
            <Card
              size="small"
              title="Donation Detail"
              style={{ boxShadow: "none" }}
            >
              <Table
                columns={requestColumns}
                dataSource={supportCategories}
                pagination={false}
              />
            </Card>
            <Card
              size="small"
              title="Note"
              style={{
                marginTop: "15px",

                boxShadow: "none",
              }}
            >
              <Form.Item name="note" label="Note">
                <TextArea
                  rows={2}
                  placeholder="Leave a message to us"
                  style={{ fontSize: "13px", width: "100%" }}
                />
              </Form.Item>
            </Card>
          </Form>
        </Col>
        <Col span={7}>
          <Card size="small" title="Children">
            <div style={{ marginBottom: "5px" }}>
              <Space size={10}>
                <div>{children?.fullName}</div>
                <div>-</div>
                <div>{children?.gender ? "Boy" : "Girl"}</div>
              </Space>
            </div>
            <div style={{ marginBottom: "5px" }}>
              <Space size={10}>
                <CalendarOutlined style={{ color: "#b2b2b2" }} />
                <div>{displayDate(children?.dob)}</div>
              </Space>
            </div>
            <div style={{ marginBottom: "5px" }}>
              <Space size={10}>
                <HomeOutlined style={{ color: "#b2b2b2" }} />
                <div>
                  {convertPublicAddressToString(children?.publicAddress)}
                </div>
              </Space>
            </div>
            <div>
              <Space size={10}>
                <UserOutlined style={{ color: "#b2b2b2" }} />
                <div>{children?.guardianName}</div>
              </Space>
            </div>
          </Card>
          <Card
            size="small"
            title="Supporter"
            style={{ marginTop: "15px" }}
            extra={
              <Link to="/myAccount">
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
                <div>{convertPublicAddressToString(currentUser?.address)}</div>
              </Space>
            </div>
            <div>
              <Space size={10}>
                <MailOutlined style={{ color: "#b2b2b2" }} />
                <div>{currentUser?.email}</div>
              </Space>
            </div>
          </Card>
          <Button
            onClick={onSubmit}
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
            Place donation
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default DonationConfirmationModal;
