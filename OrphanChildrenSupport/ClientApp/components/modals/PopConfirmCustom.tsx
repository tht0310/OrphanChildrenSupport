import { EditOutlined } from "@ant-design/icons";
import { IReportChildrenInformationModel } from "@Models/IReportInformationModel";
import { IReportDetailModel } from "@Models/IReportModel";
import { Button, Form, Popconfirm, Radio } from "antd";
import * as React from "react";

export interface IProps {
  data?: IReportDetailModel;
}

const PopconfirmCustom: React.FC<IProps> = ({ data }: IProps) => {
  const [form] = Form.useForm();

  return (
    <Popconfirm
      icon={""}
      title={
        <>
          <div style={{ marginBottom: "10px" }}>Please select status</div>
          <div>
            <Radio.Group defaultValue={data?.reportDetailStatus}>
              <Radio.Button value="1">Approved</Radio.Button>
              <Radio.Button value="0">Waiting approve</Radio.Button>
              <Radio.Button value="2">Rejected</Radio.Button>
            </Radio.Group>
          </div>
        </>
      }
      okText="Yes"
      cancelText="No"
    >
      <Button
        className="btn-custom-2 "
        icon={<EditOutlined size={14} style={{ color: "#40A9FF" }} />}
      />
    </Popconfirm>
  );
};

export default PopconfirmCustom;
