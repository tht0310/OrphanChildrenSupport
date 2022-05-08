import {
  CalendarOutlined,
  ContactsOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneFilled,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import { colors } from "@Components/shared/TagColor";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IRegisterModel } from "@Models/ILoginModel";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import ChildrenSupportCategoryService from "@Services/ChildrenSupportCategoryService";
import { displayDate, displayYear } from "@Services/FormatDateTimeService";
import SupportCategoryService from "@Services/SupportCategoryService";
import {
  Modal,
  Space,
  Table,
  Tag,
  Image,
  Col,
  Row,
  Card,
  Form,
  Input,
  InputNumber,
  Button,
} from "antd";
import React from "react";
import { Link } from "react-router-dom";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  selected: ISupportCategoryModel[];
  children: IChildrenProfileModel;
  currentUser: IRegisterModel;
}

let colorIndex;

const supportCategoriesService = new SupportCategoryService();
const childrenService = new ChildrenProfileService();
const ChildrenConfirmationModel: React.FC<IProps> = ({
  visible,
  onCancel,
  children,
  selected,
  currentUser,
}: IProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    document.title = "Children Detail";
    fetchData();
  }, []);

  React.useEffect(() => {
    colorIndex = -1;
  }, [visible]);

  async function fetchData() {
    fetchSupportCategories();
  }

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();

    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  function getAge(children) {
    const date = new Date();
    const dob = children.dob;
    return Number(date.getFullYear()) - Number(displayYear(dob));
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
    {
      title: "",
      ellipsis: true,
      width: "8%",
      align: "center",
      render: (text, row, index) => (
        <DeleteOutlined
          style={{ color: "#e57905", marginTop: "5px", fontSize: "15px" }}
        />
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

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={null}
      width={1000}
      title={"Support Confimation"}
      className="childrenConfirmation--model"
      style={{ top: 30, height: "280px" }}
      bodyStyle={{ overflowY: "scroll", height: "calc(100vh - 130px)" }}
    >
      <Row>
        <Col span={17}>
          <Form
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
          >
            <Card
              size="small"
              title="Support detail"
              style={{ marginRight: "15px", boxShadow: "none" }}
            >
              <Table
                columns={requestColumns}
                dataSource={selected}
                pagination={false}
              />
            </Card>
            <Card
              size="small"
              title="Note"
              style={{
                marginTop: "15px",
                marginRight: "15px",
                boxShadow: "none",
              }}
            >
              <Form.Item name="note" label="Note">
                <Input
                  placeholder="Leave a message to us"
                  style={{ fontSize: "13px" }}
                />
              </Form.Item>
            </Card>
          </Form>
        </Col>
        <Col span={7}>
          <Card size="small" title="Children Information">
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
            title="Supporter Information"
            style={{ marginTop: "15px" }}
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
            <div>
              <Space size={10}>
                <MailOutlined style={{ color: "#b2b2b2" }} />
                <div>{currentUser?.email}</div>
              </Space>
            </div>
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
            Place donation
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default ChildrenConfirmationModel;
