import * as React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
} from "antd";
import { Save } from "react-feather";
import TextArea from "rc-textarea";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
}

const AddPersonalProfileModal: React.FC<IProps> = ({
  visible,
  onCancel,
}: IProps) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleSubmit = (value: any) => {
    //console.log(value);
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title="Thêm mới tài khoản"
      footer={null}
      width={1000}
      className="antd-modal-custom"
    >
      <div className="modal-actions">
        <Button
          type="text"
          icon={<Save color={"#72bf42"} size={22} />}
          onClick={() => form.submit()}
        >
          Lưu
        </Button>
      </div>
      <Form
        form={form}
        style={{ padding: "20px 0" }}
        onFinish={handleSubmit}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="birthDay"
          label="Ngày sinh"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="accountName"
          label="Tài khoản"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Điện thoại" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPersonalProfileModal;
