import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import React from "react";
import { Image } from "antd";
import { IRegisterModel } from "@Models/ILoginModel";
import {
  CalendarOutlined,
  ContactsOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  GoogleOutlined,
  InstagramOutlined,
  MailOutlined,
  PoweroffOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { displayDate } from "@Services/FormatDateTimeService";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
interface Props {}

const inlineCol2FormLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const inlineFormLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const AccountDetailPage: React.FC<Props> = () => {
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
  const [form] = Form.useForm();
  React.useEffect(() => {
    getCurrentUser();
  }, []);
  React.useEffect(() => {
    innitialValue();
    console.log(currentUser);
  }, [currentUser]);
  function getCurrentUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setCurrentUser(JSON.parse(retrievedObject));
    }
  }

  function convertAddressToString(address: string) {
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

  function innitialValue() {
    form.setFieldsValue({
      id: currentUser?.id,
      fullName: currentUser?.fullName,
      gender: currentUser?.gender ? "true" : "false",
      dob: moment(currentUser?.dob),
      city: currentUser?.detailAddress.split("-")[0],
      province: currentUser?.detailAddress.split("-")[1],
      houseNumber: currentUser?.detailAddress.split("-")[2],
      phoneNumber: currentUser?.phoneNumber,
      email: currentUser?.email,
    });
  }

  return (
    <div className="account" style={{ margin: "3% 4%", background: "white" }}>
      <div className="main-body">
        <div className="row">
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    style={{ backgroundColor: "#f56a00" }}
                  >
                    N
                  </Avatar>
                  <div className="mt-3">
                    <h5>{currentUser?.fullName}</h5>
                  </div>
                </div>
              </div>
              <Card style={{ width: "100%" }}>
                <div>
                  <Row>
                    <Col span={14}>
                      <Space>
                        <GoogleOutlined
                          style={{
                            color: "#B8B8B8",
                            marginBottom: "6px",
                            fontSize: "23px",
                          }}
                        />
                        <span style={{ color: "#505050" }}>
                          <h6>Gmail</h6>
                        </span>
                      </Space>
                    </Col>
                    <Col span={9}>
                      <div>{currentUser?.email}</div>
                    </Col>
                  </Row>
                </div>
                <Divider />
                <div>
                  <Row>
                    <Col span={14}>
                      <Space>
                        <FacebookOutlined
                          style={{
                            color: "#3F63AB",
                            marginBottom: "6px",
                            fontSize: "23px",
                          }}
                        />
                        <span style={{ color: "#505050" }}>
                          <h6>Gmail</h6>
                        </span>
                      </Space>
                    </Col>
                    <Col span={9}>
                      <div>{currentUser?.email}</div>
                    </Col>
                  </Row>
                </div>
                <Divider />
                <div>
                  <Row>
                    <Col span={14}>
                      <Space>
                        <InstagramOutlined
                          style={{
                            color: "#C93226",
                            marginBottom: "6px",
                            fontSize: "23px",
                          }}
                        />
                        <span style={{ color: "#505050" }}>
                          <h6>Gmail</h6>
                        </span>
                      </Space>
                    </Col>
                    <Col span={9}>
                      <div>{currentUser?.email}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card">
              <Form
                form={form}
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
                layout="horizontal"
              >
                <Card
                  bordered={false}
                  title={
                    <>
                      <span>Personal information</span>
                      <span
                        style={{
                          float: "right",

                          marginTop: "px",
                        }}
                      >
                        <Button ghost type="primary" icon={<SaveOutlined />} />
                      </span>
                    </>
                  }
                >
                  <Form.Item name="id" label="Id" hidden={true}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="fullName"
                    label="Full name"
                    className="label-custom"
                    {...inlineFormLayout}
                    rules={[
                      { required: true, message: "Please enter full name." },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Row>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        label="Birthday"
                        name="dob"
                        {...inlineCol2FormLayout}
                        rules={[
                          {
                            required: true,
                            message: "Please enter birthday.",
                          },
                        ]}
                      >
                        <DatePicker
                          style={{ width: "100%" }}
                          format={"DD/MM/YYYY"}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item
                        style={{ marginLeft: "50px" }}
                        label="Gender"
                        name="gender"
                        {...inlineCol2FormLayout}
                        rules={[
                          { required: true, message: "Please enter gender." },
                        ]}
                      >
                        <Select>
                          <Select.Option value="false" key="1">
                            Girl
                          </Select.Option>
                          <Select.Option value="true" key="0">
                            Boy
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    {...inlineFormLayout}
                    label="Address"
                    style={{ marginBottom: "8px" }}
                    required
                  >
                    <Form.Item
                      name="city"
                      style={{ display: "inline-block", width: "25%" }}
                      rules={[{ required: true, message: "Please enter city" }]}
                    >
                      <Input placeholder="Enter city" />
                    </Form.Item>
                    <Form.Item
                      name="province"
                      rules={[
                        {
                          required: true,
                          message: "Please enter province .",
                        },
                      ]}
                      style={{
                        display: "inline-block",
                        width: "25%",
                      }}
                    >
                      <Input placeholder="Enter province" />
                    </Form.Item>
                    <Form.Item
                      name="houseNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please enter street name, house number...",
                        },
                      ]}
                      style={{
                        display: "inline-block",
                        width: "50%",
                      }}
                    >
                      <Input placeholder="Enter street name, house number..." />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item
                    name="phoneNumber"
                    label="Phone"
                    className="label-custom"
                    {...inlineFormLayout}
                    required
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    className="label-custom"
                    {...inlineFormLayout}
                    required
                  >
                    <Input disabled />
                  </Form.Item>
                </Card>
              </Form>
            </div>

            <div>
              <div className="card" style={{ marginTop: "20px" }}>
                <Form
                  form={form}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 20 }}
                  layout="horizontal"
                >
                  <Card
                    bordered={false}
                    title={
                      <>
                        <span>Change password</span>
                        <span
                          style={{
                            float: "right",
                            marginTop: "5px",
                          }}
                        >
                          <Button
                            ghost
                            type="primary"
                            onClick={() => console.log(form)}
                            icon={<SaveOutlined />}
                          />
                        </span>
                      </>
                    }
                  >
                    <Form.Item
                      name="password"
                      {...inlineFormLayout}
                      label="Old password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          min: 6,
                          message: "Password must be minimum 6 characters.",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      {...inlineFormLayout}
                      label="New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          min: 6,
                          message: "Password must be minimum 6 characters.",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item
                      name="confirmPassword"
                      {...inlineFormLayout}
                      label="Confirm "
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Card>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailPage;
