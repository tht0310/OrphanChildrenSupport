import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
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
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const onFinish = (values: any) => {
    register(values);
  };

  async function register(values: IRegisterModel | any) {
    values.address =
      values.houseNumber + " -" + values.city + " -" + values.province;
    const res = await accService.register(values);

    if (!res.hasErrors) {
      message.success("The account has been sucessfully registered");
      setIsSuccess(true);
      form.resetFields();
    } else {
      message.error("Fail adding");
    }
  }

  React.useEffect(() => {
    document.title = "Register | FOR THE CHILDREN";
  }, []);

  return (
    <div className="container-fluid h-custom center">
      <h3>Register</h3>
      {isSuccess && (
        <div className="message-custom">
          Registration sucessfully! Please check your email for verification
        </div>
      )}
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
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input />
        </Form.Item>
        <Row>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Birthday"
              name="dob"
              {...inlineCol2FormLayout}
              rules={[{ required: true, message: "Please enter birthday." }]}
            >
              <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Gender"
              name="gender"
              {...inlineCol2FormLayout}
              className="gender-options"
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
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please enter phone number" },
            { min: 10, message: "Phone must be at least 10 digits" },
            {
              pattern: new RegExp(/^[0-9()-.]+$/),
              message: "Phone must be digit only",
            },
          ]}
          // rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...inlineFormLayout}
          label="Address"
          style={{ marginBottom: "8px" }}
          required
        >
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
            name="city"
            style={{ display: "inline-block", width: "25%" }}
            rules={[{ required: true, message: "Please enter city" }]}
          >
            <Input placeholder="Enter city" />
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
          {...inlineFormLayout}
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
          label="Email"
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
            { min: 6, message: "Password must be minimum 6 characters." },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          {...inlineFormLayout}
          label="Confirm Password"
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

        <Form.Item
          {...inlineFormLayout}
          name="acceptTerms"
          label="a"
          className="accept-terms"
          valuePropName="checked"
          required
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept term")),
            },
          ]}
        >
          <Checkbox style={{ paddingRight: "5px" }} /> I agree to the terms &
          conditions and the privacy policy
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            style={{
              marginLeft: "15px",
              backgroundColor: "#88181b",
              borderRadius: "5px",
              minWidth: "30%",
              color: "white",
            }}
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
