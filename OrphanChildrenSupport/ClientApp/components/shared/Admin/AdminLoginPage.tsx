import { LockOutlined, UserOutlined } from "@ant-design/icons";
import TextEditor from "@Components/shared/TextEditor";
import { ILoginModel } from "@Models/ILoginModel";
import AccountService from "@Services/AccountService";
import { Button, Checkbox, Form, Input, message } from "antd";
import * as React from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

type Props = RouteComponentProps<{}>;

const userService = new AccountService();

const AdminLoginPage: React.FC<Props> = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    login(values);
  };

  async function login(values: ILoginModel) {
    const res = await userService.login(values);
    if (!res.hasErrors) {
      window.location.replace("/admin/dashboard");
    } else {
      message.error("Wrong username or password");
    }
  }
  return (
    <div className="admin-login-page" style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          margin: "auto",
          width: "50%",
          padding: "15px 40px",
          top: "10%",
          position: "absolute",
          left: "30%",
          background: "black",
        }}
        className="container-fluid h-custom  login-page admin-login-page"
      >
        <h3
          style={{
            textAlign: "center",
            color: "#404040",
            marginBottom: "20px",
          }}
        >
          Login
        </h3>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            name="email"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="spaceing-custom"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="confirmPassword"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember Me</Checkbox>
            </Form.Item>

            <Link className="login-form-forgot" to={"/forgotPassword"}>
              Forgot Password?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={form.submit}
              className="login-form-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
