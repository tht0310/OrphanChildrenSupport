import React, { useState } from "react";
import { Modal, Button, Form, Radio, message } from "antd";
import ReportDetailService from "@Services/ReportDetailService";
import DonationDetailService from "@Services/DonationDetailService";

export interface IProps {
  visible?: boolean;
  dataNumber?: number;
  isDonation: boolean;
  onCancel: () => void;
  data: any;
  fetchData: () => void;
}

const reportDetailsService = new ReportDetailService();
const donationDetailsService = new DonationDetailService();
const UpdateStatusModal: React.FC<IProps> = ({
  visible,
  data,
  isDonation,
  dataNumber,
  onCancel,
  fetchData,
}: IProps) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
      initilizeForm();
    }
  }, [visible]);

  function handleCancel() {
    onCancel();
  }

  function initilizeForm() {
    const name = isDonation ? "donationDetailStatus" : "reportDetailStatus";

    form.setFieldsValue({ [name]: dataNumber.toString() });
  }

  async function onFinish(values) {
    let item = data;
    if (!isDonation) {
      item.reportDetailStatus = values.reportDetailStatus;
      const res = await reportDetailsService.update(item);
      if (!res.hasErrors) {
        message.success("Sucessfull");
        onCancel();
        fetchData();
      } else {
        message.error("Unsucessful");
      }
    } else {
      item.donationDetailStatus = values.donationDetailStatus;
      const res = await donationDetailsService.update(item);
      if (!res.hasErrors) {
        message.success("Sucessfull");
        onCancel();
        fetchData();
      } else {
        message.error("Unsucessful");
      }
    }
  }

  function onSubmit() {
    form.submit();
  }

  return (
    <>
      <Modal
        title="Update status"
        visible={visible}
        onCancel={handleCancel}
        bodyStyle={{ padding: "10px 25px" }}
        onOk={onSubmit}
      >
        <div style={{ marginBottom: "15px" }}>
          Please choose report detail status:
        </div>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name={isDonation ? "donationDetailStatus" : "reportDetailStatus"}
            label=""
            rules={[{ required: true, message: "Please pick an item!" }]}
          >
            <Radio.Group>
              <Radio.Button value="1">Approved</Radio.Button>
              <Radio.Button value="0">Waiting for Approved</Radio.Button>
              <Radio.Button value="2">Rejected</Radio.Button>
              <Radio.Button value="3">Canceled</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateStatusModal;
