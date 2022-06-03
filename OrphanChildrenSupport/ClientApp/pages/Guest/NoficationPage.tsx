import { DeleteOutlined } from "@ant-design/icons";
import { Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";

interface Props {}

const NoficationPage: React.FC<Props> = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "35%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "55%",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined style={{ color: "red" }} />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "11/01/2022",
      age: 32,
      address: "Your donation request is accepted",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "11/02/2022",
      age: 42,
      address: "Your donation request is denied",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "14/01/2021",
      age: 32,
      address: "Your password is changed sucessfully",
      tags: ["cool", "teacher"],
    },
    {
      key: "3",
      name: "12/01/2021",
      age: 32,
      address: "Your donation request is accepted",
      tags: ["cool", "teacher"],
    },
    {
      key: "3",
      name: "12/01/2021",
      age: 32,
      address: " Your password is changed sucessfully",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div className={"notification-page"}>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default NoficationPage;
