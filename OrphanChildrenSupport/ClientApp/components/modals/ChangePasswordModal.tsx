import * as React from "react";
import {
  Avatar,
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
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { DataServices } from "@Services/DataServices";
import { useState } from "react";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { IRegisterModel } from "@Models/ILoginModel";
import AccountService from "@Services/AccountService";
import { SettingOutlined } from "@ant-design/icons";

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

const ChangePasswordModal: React.FC<IProps> = ({
  fetchData,
  visible,
  onCancel,
  item,
}: IProps) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<IRegisterModel>();

  React.useEffect(() => {
    if (item) {
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

  function innitialValue() {
    form.setFieldsValue({
      id: item.id,
    });
  }

  async function onFinish(values: IRegisterModel | any) {
    const tempValue = item;
    tempValue.confirmPassword = values.confirmPassword;
    tempValue.password = values.password;
    const res = await accountService.update(tempValue);

    if (!res.hasErrors) {
      message.success("Change password sucessfully");
      fetchData();
      handleCancel();
    } else {
      message.error("An error occured during change password");
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title={"Change password"}
      footer={null}
      className="antd-modal-custom"
      style={{ top: 80, height: "300px" }}
      bodyStyle={{
        overflowY: "scroll",
        marginLeft: "19px",
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="modal-actions">
          <Button
            type="text"
            danger
            //icon={<Save color={"#72bf42"} size={22} />}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
