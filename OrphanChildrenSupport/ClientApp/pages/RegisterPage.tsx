import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";
import {
  AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import AccountService from "@Services/AccountService";
import { IRegisterModel } from "@Models/ILoginModel";

type Props = RouteComponentProps<{}>;
const accService = new AccountService();
const inlineCol2FormLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 12,
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 19,
      offset: 8,
    },
  },
};

const inlineFormLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
};

const RegisterPage: React.FC<Props> = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    register(values);
  };

  async function register(values: IRegisterModel) {
    values.acceptTerms = true;
    values.publicAddress = "abc";
    const res = await accService.register(values);
    console.log(values);
    if (!res.hasErrors) {
      message.success("Successfull");
    } else {
      message.error("Fail");
    }
  }
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h3 className="title">Register</h3>
            <Form
              form={form}
              name="register"
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
              }}
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                {...inlineFormLayout}
                name="fullName"
                label="Full Name"
                required
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
                    <DatePicker
                      style={{ width: "100%" }}
                      format={"DD/MM/YYYY"}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item
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
              <Form.Item {...inlineFormLayout} name="phoneNumber" label="Phone">
                <Input />
              </Form.Item>

              <Form.Item
                {...inlineFormLayout}
                name="detailAddress"
                label="Address"
                required
              >
                <TextArea rows={2} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                {...inlineFormLayout}
                name="email"
                label="Email"
                rules={[{ type: "email" }]}
                required
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                {...inlineFormLayout}
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
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

              <Form.Item {...tailFormItemLayout}>
                <Button
                  style={{ marginLeft: "25px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
