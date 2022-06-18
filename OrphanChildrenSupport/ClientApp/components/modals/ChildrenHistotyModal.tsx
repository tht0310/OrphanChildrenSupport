import React, { useState } from "react";
import { Modal, Button, Form, Radio, message } from "antd";
import ReportDetailService from "@Services/ReportDetailService";
import DonationDetailService from "@Services/DonationDetailService";

export interface IProps {
  visible?: boolean;
  onCancel: () => void;
}

const reportDetailsService = new ReportDetailService();
const donationDetailsService = new DonationDetailService();
const ChildrenHistoryModal: React.FC<IProps> = ({
  visible,
  onCancel,
}: IProps) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (visible) {
    }
  }, [visible]);

  function handleCancel() {
    onCancel();
  }

  return (
    <>
      <Modal
        title="Donation History"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleCancel}
        bodyStyle={{ padding: "10px 25px" }}
      >
        asajsk
      </Modal>
    </>
  );
};

export default ChildrenHistoryModal;
