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
  Upload,
} from "antd";
import { Plus, Save } from "react-feather";

import SupportCategoryService from "@Services/SupportCategoryService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { displayDateTime } from "@Services/FormatDateTimeService";
import ChildrenSupportCategoryService from "@Services/ChildrenSupportCategoryService";

const { TextArea } = Input;

const supportCategoriesService = new SupportCategoryService();

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data?: ISupportCategoryModel;
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

const SupportCategoryModal: React.FC<IProps> = ({
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

  async function onFinish(values: ISupportCategoryModel) {
    if (data) {
      const res = await supportCategoriesService.update(values);
      if (!res.hasErrors) {
        message.success(`${values.title} has been successfully updated`);
        onCancel();
        fetchData();
      }
    } else {
      const res = await supportCategoriesService.add(values);
      if (!res.hasErrors) {
        message.success(`${values.title} has been successfully added`);
        onCancel();
        fetchData();
      }
    }
  }

  function innitialValue() {
    form.setFieldsValue({
      id: data.id,
      title: data.title,
    });
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title={data ? "Edit support category" : "Add new support category"}
      footer={null}
      width={700}
      className="antd-modal-custom"
      style={{ height: "200px" }}
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
        <Form.Item {...inlineFormLayout} name="title" label="Title" required>
          <Input />
        </Form.Item>
        {data && (
          <>
            <Row>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Create by"
                  name="createdBy"
                  {...inlineCol2FormLayout}
                >
                  <Input disabled defaultValue={data.createdBy} />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item
                  label="Created time"
                  name="createdTime"
                  {...inlineCol2FormLayout}
                >
                  <Input
                    disabled
                    defaultValue={
                      data.createdTime ? displayDateTime(data.createdTime) : ""
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Last Modified"
                  name="lastModified"
                  {...inlineCol2FormLayout}
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
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Modified By"
                  name="modifiedBy"
                  {...inlineCol2FormLayout}
                >
                  <Input disabled defaultValue={data.modifiedBy} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        <div className="modal-actions">
          <Button
            type="text"
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

export default SupportCategoryModal;
