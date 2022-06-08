import * as React from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";

import { IReportFieldModel } from "@Models/IReportFieldModel";
import { IReportDetailModel } from "@Models/IReportModel";
import moment from "moment";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { ArrowRightOutlined } from "@ant-design/icons";
import TextEditor from "@Components/shared/TextEditor";

const { TextArea } = Input;

const inlineFormLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 19,
  },
};

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
  data: IReportDetailModel;
  children: IChildrenProfileModel;
  reportField: IReportFieldModel[];
  label: string;
}

const options = [
  { name: "Full Name", value: "fullName" },
  { name: "Birthday", value: "dob" },
  { name: "Address", value: "detailAddress" },
  { name: "Gender", value: "gender" },
  { name: "Circumstance", value: "circumstance" },
  { name: "Guardian Name", value: "guardianName" },
  { name: "Other", value: "other" },
];
const ReportDetailModal: React.FC<IProps> = ({
  visible,
  data,
  onCancel,
  children,
  reportField,
  label,
}: IProps) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      form.resetFields();

      if (data) {
      }
    }
  }, [data, visible]);

  function findName(v) {
    let result = "";
    options.map((o) => {
      if (o.value === v) {
        result = o.name;
      }
    });
    return result;
  }

  function findNamebyId(id) {
    let result = "";
    reportField.map((o) => {
      if (o.id === id) {
        result = o.title;
      }
    });
    return result;
  }

  function renderBody(fieldId: number, value: string) {
    const name = findNamebyId(fieldId);
    const label = findName(name);
    let oldValue = children ? children[name] : "";
    let result;

    switch (name) {
      case "dob":
        result = (
          <>
            <Row>
              {" "}
              <Col span={11}>
                <DatePicker
                  style={{ width: "100%" }}
                  defaultValue={moment(oldValue)}
                  disabled
                  format="DD/MM/YYYY"
                />
              </Col>
              <Col span={2} style={{ textAlign: "center" }}>
                <ArrowRightOutlined
                  style={{ color: "#e57905", marginTop: "5px" }}
                />
              </Col>
              <Col span={11}>
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  defaultValue={moment(data?.reportInformation)}
                />
              </Col>
            </Row>
          </>
        );
        break;
      case "circumstance":
        result = (
          <>
            <Row>
              {" "}
              <Col span={11}>
                <TextEditor value={oldValue} editable={false}></TextEditor>
              </Col>
              <Col span={2} style={{ textAlign: "center" }}>
                <ArrowRightOutlined
                  style={{ color: "#e57905", margin: "auto", padding: "10px" }}
                />
              </Col>
              <Col span={11}>
                <TextEditor defaultValue={data?.reportInformation}></TextEditor>
              </Col>
            </Row>
          </>
        );
        break;

      case "gender":
        result = (
          <>
            <Row>
              <Col span={11}>
                <Input defaultValue={oldValue ? "Boy" : "Girl"} disabled />
              </Col>
              <Col span={2} style={{ textAlign: "center" }}>
                <ArrowRightOutlined
                  style={{ color: "#e57905", marginTop: "5px" }}
                />
              </Col>
              <Col span={11}>
                <Form.Item>
                  <Select
                    defaultValue={data?.reportInformation}
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="0">Boy</Select.Option>
                    <Select.Option value="1">Girl</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
        );
        break;
      default:
        result = (
          <>
            <Row>
              <Col span={11}>
                <Input defaultValue={oldValue} disabled />
              </Col>
              <Col span={2} style={{ textAlign: "center" }}>
                <ArrowRightOutlined
                  style={{ color: "#e57905", marginTop: "5px" }}
                />
              </Col>
              <Col span={11}>
                <Input defaultValue={data?.reportInformation} />
              </Col>
            </Row>
          </>
        );
    }
    return result;
  }

  async function handleCancel() {
    onCancel();
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose={true}
      title={"Confirmation"}
      footer={null}
      width={700}
      className="antd-modal-custom"
      bodyStyle={{
        padding: "10px 25px",
        minHeight: "100px",
        overflowY: "scroll",
        maxHeight: "400px",
      }}
      style={{ height: "200px", top: "40" }}
    >
      <div>Are you sure to change {label.toLowerCase()} from ?</div>
      <Form
        form={form}
        style={{ padding: "20px 0" }}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        {renderBody(data?.reportFieldCategoryId, data?.reportInformation)}
        <Row
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: "90px",
            marginTop: "20px",
          }}
        >
          <Button type="primary" style={{ textAlign: "center" }}>
            Save
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default ReportDetailModal;
