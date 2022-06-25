import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";
import queryString from "query-string";
import AccountService from "@Services/AccountService";
import {
  IForgotPasswordModel,
  ILoginModel,
  IResetPasswordModel,
  IVerifyModel,
} from "@Models/ILoginModel";
import { Button, Col, Form, Input, message, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
type Props = RouteComponentProps<{}>;

const accService = new AccountService();
const inlineFormLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 18,
  },
};

const ResetPasswordPage: React.FC<Props> = ({
  match,
  history,
  location,
}: Props) => {
  const [token, setToken] = React.useState<IVerifyModel>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  React.useEffect(() => {
    setToken({ token: queryString.parse(location.search).token });
  }, [location.search]);

  React.useEffect(() => {
    form.setFieldsValue({ token: token?.token });
  }, [token]);

  const onFinish = (values: IResetPasswordModel) => {
    resetPassword(values);
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

  async function resetPassword(values: IResetPasswordModel) {
    const res = await accService.resetPassword(values);
    if (!res.hasErrors) {
      window.location.href = "/login";
    } else {
      message.error("Reset password unsuccessfully");
    }
  }

  return (
    <div className="container-fuild message-layout center ">
      <h4 style={{ marginLeft: "28px", marginBottom: "30px" }}>
        Reset Password
      </h4>

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
          name="token"
          label="Token"
          required
          hidden
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
        </Form.Item>

        <Form.Item>
          <Button
            style={{
              backgroundColor: "#88181b",
              borderRadius: "5px",
              width: "25%",
              color: "white",
            }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;
