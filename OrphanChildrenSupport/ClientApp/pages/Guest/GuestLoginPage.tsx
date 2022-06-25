import { ILoginModel } from "@Models/ILoginModel";
import * as loginStore from "@Store/loginStore";
import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import FormValidator from "@Components/shared/FormValidator";
import Button from "react-bootstrap/Button";
import { Formik, Field } from "formik";
import { FormGroup } from "react-bootstrap";
import { withStore } from "@Store/index";
import SessionManager from "../../core/session";
import { Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type Props = RouteComponentProps<{}> &
  typeof loginStore.actionCreators &
  loginStore.ILoginStoreState;

const GuestLoginPage: React.FC<Props> = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    login(values);
  };

  async function login(values: ILoginModel) {
    await props.login(values);
  }

  // if (SessionManager.isAuthenticated && props.isLoginSuccess) {
  //   return <Redirect to="/" />;
  // } else {
  //   props.loginWithoutData();
  // }

  return (
    <div
      className="container-fluid h-custom center login-page"
      style={{ paddingTop: "30px" }}
    >
      <h3 style={{ marginTop: "" }}>Login</h3>

      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
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
          <Button type="primary" className="login-form-button">
            Login
          </Button>
          Not a member yet?{" "}
          <Link to="/register" style={{ color: "#88181b" }}>
            Register Now
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

// Connect component with Redux store.
var connectedComponent = withStore(
  GuestLoginPage,
  (state) => state.login, // Selects which state properties are merged into the component's props.
  loginStore.actionCreators // Selects which action creators are merged into the component's props.
);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);
