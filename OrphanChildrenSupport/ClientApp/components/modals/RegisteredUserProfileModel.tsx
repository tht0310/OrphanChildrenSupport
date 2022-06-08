import * as React from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { Plus, Save } from "react-feather";

import moment from "moment";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { DataServices } from "@Services/DataServices";
import { useState } from "react";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import SupportCategoryService from "@Services/SupportCategoryService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { IRegisterModel } from "@Models/ILoginModel";
import AccountService from "@Services/AccountService";

const { TextArea } = Input;

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  item?: IRegisterModel;
  fetchData: () => void;
}

const inlineCol2FormLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const inlineFormLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
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
  const [imageUrl, setImageUrl] = useState<string | null>();
  const [imageFile, setImageFile] = useState<UploadFile<any>>();
  const [data, setData] = useState<IRegisterModel>();

  React.useEffect(() => {
    if (item) {
      setData(item);
      innitialValue();
    }
  }, [item]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  function onSubmit() {
    form.submit();
  }

  async function onFinish(values: IRegisterModel | any) {}

  function innitialValue() {
    form.setFieldsValue({
      id: item.id,
      fullName: item.fullName,
      gender: item.gender ? "true" : "false",
      dob: moment(item.dob),
      city: item.address?.split("-")[0],
      province: item.address?.split("-")[1],
      houseNumber: item.address?.split("-")[2],
    });
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title={data ? "Edit profile" : "View profile"}
      footer={null}
      width={900}
      className="antd-modal-custom"
      style={{ top: 30, height: "300px" }}
      bodyStyle={{
        overflowY: "scroll",
        height: "calc(100vh - 140px)",
        marginLeft: "35px",
        padding: "10px 30px 0px 20px",
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

        <Row style={{ textAlign: "center" }}>
          <Col span={24}>
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
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} lg={12}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Mobile Phone"
                      name="mobilePhone"
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
                  rules={[{ required: true, message: "Please enter status." }]}
                >
                  <Select defaultValue={"0"}>
                    <Select.Option value="0" key="1">
                      Normal User
                    </Select.Option>
                    <Select.Option value="1" key="0">
                      System User
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  {...inlineCol2FormLayout}
                  rules={[{ required: true, message: "Please enter status." }]}
                >
                  <Select>
                    <Select.Option value="0" key="1">
                      Active
                    </Select.Option>
                    <Select.Option value="1" key="0">
                      Disactive
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

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

        {/* <Form.Item
          name="password"
          {...inlineFormLayout}
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            { min: 6, message: "Password must be minimum 6 characters." },
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item> */}
        <div className="modal-actions">
          <Button type="text" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default RegisteredUserProfileModal;
