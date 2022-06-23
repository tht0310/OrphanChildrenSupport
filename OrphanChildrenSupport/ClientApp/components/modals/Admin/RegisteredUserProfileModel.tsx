import * as React from "react";
import {
  Avatar,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
} from "antd";

import moment from "moment";
import { displayDateTime } from "@Services/FormatDateTimeService";
import { useState } from "react";
import { IRegisterModel } from "@Models/ILoginModel";
import AccountService from "@Services/AccountService";
import { SettingOutlined } from "@ant-design/icons";
import ChangePasswordModal from "../User/ChangePasswordModal";

const { TextArea } = Input;

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  item?: IRegisterModel;
  fetchData: () => void;
}

const inlineCol2FormLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const inlineFormLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
};

const accountService = new AccountService();

const RegisteredUserProfileModal: React.FC<IProps> = ({
  fetchData,
  visible,
  onCancel,
  item,
}: IProps) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IRegisterModel>();
  const [isModal, setIsModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (item) {
      setData(item);
      innitialValue();
    }
  }, [item]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
    setData(null);
  };

  function onSubmit() {
    form.submit();
  }

  function findName(value) {
    if (value) {
      const name = value.split(" ");
      return name[name.length - 1][0];
    }
  }

  async function onFinish(values: IRegisterModel | any) {
    values.address =
      values.city + "-" + values.province + "-" + values.houseNumber;
    if (data) {
      const res = await accountService.update(values);
      if (!res.hasErrors) {
        let roleValue =
          values.role === "Admin" ? 0 : values.role === "SystemUser" ? 1 : 2;
        await accountService.updateRole(values.id, roleValue);

        if (values.isActive) {
          await accountService.activeUser(values.id);
        } else {
          await accountService.deactiveUser(values.id);
        }

        message.success("Update sucessfully");
        fetchData();
        handleCancel();
      } else {
        message.error("Email has registered");
      }
    } else {
      const res = await accountService.add(values);
      if (!res.hasErrors) {
        let roleValue =
          values.role === "Admin" ? 0 : values.role === "SystemUser" ? 1 : 2;
        await accountService.updateRole(res.value.id, roleValue);

        if (values.isActive) {
          await accountService.activeUser(values.id);
        } else {
          await accountService.deactiveUser(values.id);
        }

        message.success("Add sucessfully");
        fetchData();
        handleCancel();
      } else {
        message.error("Email has registered");
      }
    }
  }

  function innitialValue() {
    form.setFieldsValue({
      id: item.id,
      fullName: item.fullName,
      gender: item.gender ? "true" : "false",
      dob: moment(item.dob),
      city: item.address?.split("-")[0],
      province: item.address?.split("-")[1],
      houseNumber: item.address?.split("-")[2],
      phoneNumber: item?.phoneNumber,
      email: item?.email,
      role: item?.role,
      isActive: item?.isActive,
    });
  }

  function toggleModel() {
    setIsModal(!isModal);
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title={data ? "Edit user" : "Add new user"}
      onOk={onSubmit}
      width={980}
      className="antd-modal-custom"
      style={{ top: 25 }}
      bodyStyle={{
        overflowY: "scroll",
        height: "calc(100vh - 165px)",
        marginLeft: "19px",
        paddingLeft: 0,
      }}
    >
      <Form
        form={form}
        style={{ padding: "20px 0" }}
        onFinish={onFinish}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item name="id" label="Id" hidden={true}>
          <Input />
        </Form.Item>

        <Row>
          <Col
            span={6}
            xs={24}
            lg={6}
            style={{ textAlign: "center", paddingRight: "15px" }}
          >
            <Avatar
              style={{
                backgroundColor: "#7265e6",
                verticalAlign: "middle",
                fontSize: "35px",
                paddingLeft: 0,
              }}
              shape="square"
              size={150}
            >
              {findName(item?.fullName)}
            </Avatar>
            {data && (
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "#404040",
                }}
                onClick={toggleModel}
              >
                <SettingOutlined /> Change password
              </div>
            )}
          </Col>
          <Col span={18}>
            <Form.Item
              name="fullName"
              label="Full name"
              className="label-custom"
              {...inlineFormLayout}
              rules={[{ required: true, message: "Please enter full name." }]}
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
                    { required: true, message: "Please enter birthday." },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  {...inlineCol2FormLayout}
                  rules={[{ required: true, message: "Please enter gender." }]}
                >
                  <Select>
                    <Select.Option value="false" key="1">
                      Female
                    </Select.Option>
                    <Select.Option value="true" key="0">
                      Male
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
                rules={[{ required: true, message: "Please enter province ." }]}
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

            <Row>
              <Col xs={24} lg={12}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Email"
                      name="email"
                      {...inlineCol2FormLayout}
                      required
                    >
                      <Input disabled={data ? true : false} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} lg={12}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Mobile Phone"
                      name="phoneNumber"
                      {...inlineCol2FormLayout}
                      required
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Role"
                  name="role"
                  {...inlineCol2FormLayout}
                  rules={[{ required: true, message: "Please enter role." }]}
                >
                  <Select>
                    <Select.Option value="User" key="1">
                      Normal User
                    </Select.Option>
                    <Select.Option value="SystemUser" key="0">
                      System User
                    </Select.Option>
                    <Select.Option value="Admin" key="2">
                      Admin
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Status"
                  name="isActive"
                  {...inlineCol2FormLayout}
                  // rules={[{ required: true, message: "Please enter status." }]}
                >
                  <Select>
                    <Select.Option value={true} key="1">
                      Active
                    </Select.Option>
                    <Select.Option value={false} key="0">
                      Inactive
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {!data && (
              <>
                <Form.Item
                  name="password"
                  {...inlineFormLayout}
                  label="Password"
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
              </>
            )}

            {data && (
              <>
                <Row>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Create by"
                      name="createdBy"
                      {...inlineCol2FormLayout}
                    >
                      <Input disabled defaultValue={data.createdBy} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Created time"
                      name="createdTime"
                      {...inlineCol2FormLayout}
                    >
                      <Input
                        disabled
                        defaultValue={
                          data.createdTime
                            ? displayDateTime(data.createdTime)
                            : ""
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Last Modified"
                      name="lastModified"
                      {...inlineCol2FormLayout}
                    >
                      <Input
                        disabled
                        defaultValue={
                          data.lastModified
                            ? displayDateTime(data.lastModified)
                            : ""
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item
                      label="Modified By"
                      name="modifiedBy"
                      {...inlineCol2FormLayout}
                    >
                      <Input disabled defaultValue={data.modifiedBy} />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Form>
      <ChangePasswordModal
        onCancel={toggleModel}
        visible={isModal}
        item={data}
        fetchData={fetchData}
      />
    </Modal>
  );
};

export default RegisteredUserProfileModal;
