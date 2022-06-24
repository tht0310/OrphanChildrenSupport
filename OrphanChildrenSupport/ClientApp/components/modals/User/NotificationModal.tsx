import { INotificationModel } from "@Models/INotificationModel";
import { displayDateTime } from "@Services/FormatDateTimeService";
import NotificationService from "@Services/NotificationService";
import { Col, Form, Input, Modal, Row } from "antd";
import * as React from "react";

export interface IProps {
  data?: INotificationModel;
  visible?: boolean;
  onCancel: () => void;
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
const service = new NotificationService();
const NotificationModal: React.FC<IProps> = ({
  data,
  visible,
  onCancel,
  fetchData,
}: IProps) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      form.resetFields();
      update();
      if (data) {
        innitialValue();
      }
    }
  }, [data, visible]);

  function handleCancel() {
    onCancel();
  }

  async function update() {
    data.isSeen = true;
    await service.update(data);
  }

  function innitialValue() {
    form.setFieldsValue({
      id: data?.id,
      content: data?.content,
      isSeen: data?.isSeen,
      seenTime: data?.seenTime,
    });
  }

  return (
    <Modal
      title="Update status"
      visible={visible}
      onCancel={handleCancel}
      bodyStyle={{ padding: "10px 25px" }}
      onOk={handleCancel}
    >
      <div style={{ marginBottom: "15px" }}>
        Please choose report detail status:
      </div>
      <Form form={form}>
        <Form.Item
          {...inlineFormLayout}
          name="content"
          label="Content"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item name="id" label="Id" hidden={true} {...inlineFormLayout}>
          <Input />
        </Form.Item>

        <Form.Item label="Seen Time" name="seenTime" {...inlineFormLayout}>
          <Input
            disabled
            defaultValue={data?.seenTime ? displayDateTime(data.seenTime) : ""}
          />
        </Form.Item>

        <Row>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Create by"
              name="createdBy"
              {...inlineCol2FormLayout}
            >
              <Input disabled defaultValue={data?.createdBy} />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item
              label="Created Time"
              name="createdTime"
              {...inlineCol2FormLayout}
            >
              <Input
                disabled
                defaultValue={
                  data?.createdTime ? displayDateTime(data?.createdTime) : ""
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default NotificationModal;
