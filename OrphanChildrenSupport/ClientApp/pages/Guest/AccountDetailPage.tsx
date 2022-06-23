import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import React from "react";
import { ILoginModel, IRegisterModel } from "@Models/ILoginModel";
import {
  FacebookOutlined,
  GoogleOutlined,
  InstagramOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import moment from "moment";
import AccountService from "@Services/AccountService";
interface Props {}

const userService = new AccountService();

const inlineFormLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const AccountDetailPage: React.FC<Props> = () => {
  const [localUser, setLocalUser] = React.useState<ILoginModel>(null);
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  React.useEffect(() => {
    getLocalUser();
  }, []);
  React.useEffect(() => {
    if (localUser) {
      fetchUser(localUser.id);
    }
  }, [localUser]);
  React.useEffect(() => {
    if (currentUser) {
      innitialValue();
    }
  }, [currentUser]);

  async function fetchUser(id) {
    const res = await userService.getAccount(id);
    if (!res.hasErrors) {
      setCurrentUser(res.value);
    }
  }

  function getLocalUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setLocalUser(JSON.parse(retrievedObject));
    }
  }

  function innitialValue() {
    form.setFieldsValue({
      id: currentUser?.id,
      fullName: currentUser?.fullName,
      gender: currentUser?.gender ? "true" : "false",
      dob: moment(currentUser?.dob),
      phoneNumber: currentUser?.phoneNumber,
      email: currentUser?.email,
      city: currentUser?.address?.split("-")[0],
      province: currentUser?.address?.split("-")[1],
      houseNumber: currentUser?.address?.split("-")[2],
    });
  }

  async function handleFinish(values) {
    const temp = values;
    temp.address =
      values.city + "-" + values.province + "-" + values.houseNumber;
    const res = await userService.update(temp);
    if (!res.hasErrors) {
      message.success("Change information sucessfully");
      fetchUser(currentUser.id);
    } else {
      message.error("An error occured during updation");
    }
  }

  async function handleChangePassword(values) {
    const temp = currentUser;
    temp.password = values.password;
    temp.confirmPassword = values.confirmPassword;
    const res = await userService.update(temp);
    if (!res.hasErrors) {
      message.success("Change password sucessfully");
      form2.resetFields();
    } else {
      message.error("An error occured during updation");
    }
  }

  function findName(value) {
    if (value) {
      const name = value.split(" ");
      return name[name.length - 1][0];
    }
  }

  return (
    <div
      className="account"
      style={{ padding: "3% 3%", marginTop: "15px", background: "white" }}
    >
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
                    {findName(currentUser?.fullName)}
                  </Avatar>
                  <div className="mt-3">
                    <h5>{currentUser?.fullName}</h5>
                  </div>
                </div>
              </div>
              <Card style={{ width: "100%" }}>
                <div>
                  <Row>
                    <Col span={13}>
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
                    <Col span={11}>
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
                onFinish={handleFinish}
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
                        <Button
                          onClick={form.submit}
                          ghost
                          type="primary"
                          icon={<SaveOutlined />}
                        />
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
                  <Form.Item
                    label="Birthday"
                    name="dob"
                    {...inlineFormLayout}
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
                  <Form.Item
                    label="Gender"
                    name="gender"
                    {...inlineFormLayout}
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
                  form={form2}
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 20 }}
                  layout="horizontal"
                  onFinish={handleChangePassword}
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
                            onClick={form2.submit}
                            ghost
                            type="primary"
                            icon={<SaveOutlined />}
                          />
                        </span>
                      </>
                    }
                  >
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
