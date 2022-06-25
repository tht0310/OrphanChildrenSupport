import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";
import queryString from "query-string";
import AccountService from "@Services/AccountService";
import {
  IForgotPasswordModel,
  ILoginModel,
  IVerifyModel,
} from "@Models/ILoginModel";
import { Button, Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
type Props = RouteComponentProps<{}>;

const accService = new AccountService();

const ForgotPasswordPage: React.FC<Props> = ({
  match,
  history,
  location,
}: Props) => {
  const [token, setToken] = React.useState<IVerifyModel>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish = (values: IForgotPasswordModel) => {
    forgotPassword(values);
  };

  async function forgotPassword(values: IForgotPasswordModel) {
    const res = await accService.forgotPassword(values);
    if (!res.hasErrors) {
      message.success("Please check your email for resetting password");
    } else {
      message.error("Your email is not exist");
    }
  }

  return (
    <div
      className="container-fuild message-layout center "
      style={{ paddingTop: "30px" }}
    >
      <h4 style={{ marginBottom: "30px" }}>Forgot Password</h4>

      <Form style={{}} form={form} onFinish={onFinish} scrollToFirstError>
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
            style={{ width: "100%" }}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <div style={{ padding: "0px 30%" }}>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Submit
              </Button>
            )}
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;
