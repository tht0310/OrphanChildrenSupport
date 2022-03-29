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
} from "antd";
import { Save } from "react-feather";
import PersonalProfileService from "@Services/PersonalProfileService";
import {
  IPersonalProfileModel,
  IAddPersonProfileModel,
} from "@Models/IPersonalProfileModel";
import moment from "moment";
import { displayDateTime } from "@Services/FormatDateTimeService";
const { TextArea } = Input;

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data?: IPersonalProfileModel;
  fetchData: () => void;
}

const inlineFormLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const personalProfileService = new PersonalProfileService();

const PersonalProfileModal: React.FC<IProps> = ({
  fetchData,
  visible,
  onCancel,
  data,
}: IProps) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      form.resetFields();
      if (data) {
        innitialValue();
      }
    }
  }, [data, visible]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  function onSubmit() {
    form.submit();
  }

  const validateMessages = {
    required: "Vui lòng điền ${label}",
    types: {
      email: "Email không hợp lệ",
    },
  };

  async function onFinish(values: IPersonalProfileModel) {
    console.log(values);
    if (data) {
      const res = await personalProfileService.update(values);
      if (!res.hasErrors) {
        message.success(`${values.fullName} has been successfully updated`);
        onCancel();
        fetchData();
      }
    } else {
      const res = await personalProfileService.add(values);
      if (!res.hasErrors) {
        message.success(`${values.fullName} has been successfully added`);
        onCancel();
        fetchData();
      }
    }
  }

  function innitialValue() {
    console.log(data);
    form.setFieldsValue({
      id: data.id,
      fullName: data.fullName,
      gender: data.gender ? "true" : "false",
      birthDay: moment(data.birthDay),
      accountName: data.accountName,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
    });
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title={data ? "Chỉnh sửa tài khoản" : "Thêm mới tài khoản"}
      footer={null}
      width={1000}
      className="antd-modal-custom"
    >
      <Form
        form={form}
        style={{ padding: "20px 0" }}
        onFinish={onFinish}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        validateMessages={validateMessages}
      >
        <Form.Item name="id" label="Id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Row>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Ngày sinh"
              name="birthDay"
              {...inlineFormLayout}
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Giới tính"
              name="gender"
              {...inlineFormLayout}
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="false" key="1">
                  Nữ
                </Select.Option>
                <Select.Option value="true" key="0">
                  Nam
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="mobile"
          label="Điện thoại"
          className="label-custom"
          rules={[
            {
              pattern: /^(?:\d*)$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="accountName"
          label="Tài khoản"
          rules={[{ required: true }]}
        >
          <Input disabled={data ? true : false} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Địa chỉ" className="label-custom">
          <TextArea rows={data ? 1 : 3} style={{ width: "100%" }} />
        </Form.Item>
        {data && (
          <>
            <Row>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Create by"
                  name="createdBy"
                  {...inlineFormLayout}
                >
                  <Input disabled defaultValue={data.createdBy} />
                </Form.Item>
              </Col>
              {/* <Col xs={24} lg={12}>
                <Form.Item
                  label="Created time"
                  name="createdTime"
                  {...inlineFormLayout}
                >
                  <Input
                    disabled
                    defaultValue={
                      data.createdTime ? displayDateTime(data.createdTime) : ""
                    }
                  />
                </Form.Item>
              </Col> */}
            </Row>
            <Row>
              {/* <Col xs={24} lg={12}>
                <Form.Item
                  label="Last Modified"
                  name="lastModified"
                  {...inlineFormLayout}
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
              </Col> */}
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Modified By"
                  name="modifiedBy"
                  {...inlineFormLayout}
                >
                  <Input disabled defaultValue={data.modifiedBy} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </Form>
      <div className="modal-actions">
        <Button
          type="text"
          //icon={<Save color={"#72bf42"} size={22} />}
          onClick={onSubmit}
        >
          Lưu thông tin
        </Button>
      </div>
    </Modal>
  );
};

export default PersonalProfileModal;
