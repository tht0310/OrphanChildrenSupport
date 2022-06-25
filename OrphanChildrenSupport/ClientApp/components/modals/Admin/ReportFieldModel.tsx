import * as React from "react";
import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd";

import { displayDateTime } from "@Services/FormatDateTimeService";
import { IReportFieldModel } from "@Models/IReportFieldModel";
import ReportFieldService from "@Services/ReportFieldService";
import { options } from "@Components/shared/ReportFieldOptions";

const { TextArea } = Input;

const reportFieldService = new ReportFieldService();

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data?: IReportFieldModel;
  fetchData: () => void;
  reportField: IReportFieldModel[];
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

const ReportFieldModal: React.FC<IProps> = ({
  fetchData,
  visible,
  onCancel,
  data,
  reportField,
}: IProps) => {
  const [form] = Form.useForm();
  const [field, setField] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (visible) {
      form.resetFields();
      fileterOptions();
      if (data) {
        innitialValue();
      }
    }
  }, [data, visible]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const fileterOptions = () => {
    var filteredArray = options.filter(function (array_el) {
      return (
        reportField.filter(function (anotherOne_el) {
          return anotherOne_el.title === array_el.value;
        }).length == 0
      );
    });
    setField(filteredArray);
  };

  function onSubmit() {
    form.submit();
  }

  async function onFinish(values: IReportFieldModel) {
    if (data) {
      const res = await reportFieldService.update(values);
      if (!res.hasErrors) {
        message.success(`${values.title} has been successfully updated`);
        onCancel();
        fetchData();
      }
    } else {
      const res = await reportFieldService.add(values);
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
      title={data ? "Edit report category" : "Add report category"}
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
        <Form.Item
          {...inlineFormLayout}
          name="title"
          label="Title"
          rules={[{ required: true }]}
        >
          <Select>
            {field.map((v) => {
              return <Select.Option value={v.value}>{v.name}</Select.Option>;
            })}
          </Select>
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

export default ReportFieldModal;
