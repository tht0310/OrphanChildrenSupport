import { DeleteOutlined } from "@ant-design/icons";
import NotificationModal from "@Components/modals/NotificationModal";
import { ILoginModel, IRegisterModel } from "@Models/ILoginModel";
import { INotificationModel } from "@Models/INotificationModel";
import AccountService from "@Services/AccountService";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import NotificationService from "@Services/NotificationService";
import { message, Popconfirm, Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";

interface Props {}

const service = new NotificationService();
const userService = new AccountService();

const NoficationPage: React.FC<Props> = () => {
  const [data, setData] = React.useState<INotificationModel[]>([]);
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>();
  const [localUser, setLocalUser] = React.useState<ILoginModel>(null);
  const [modelForEdit, setModelForEdit] = React.useState<INotificationModel>();
  const [isModal, setIsModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    getLocalUser();
  }, []);

  React.useEffect(() => {
    if (localUser) {
      fetchUser(localUser.id);
    }
  }, [localUser]);

  React.useEffect(() => {
    if (currentUser) {
      fetchNotificaiton();
    }
  }, [currentUser?.id]);

  async function fetchUser(id) {
    const res = await userService.getAccount(id);
    if (!res.hasErrors) {
      setCurrentUser(res.value);
    }
  }

  function getLocalUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setLocalUser(JSON.parse(retrievedObject));
    }
  }

  async function onDelete(id) {
    const res = await service.delete(id);
    if (!res.hasErrors) {
      message.success("Remove sucessfully");
      fetchNotificaiton();
    }
  }

  async function toggleModal() {
    setIsModal(!isModal);
    setModelForEdit(null);
  }

  async function fetchNotificaiton() {
    const res = await service.getAll({ accountId: currentUser.id });
    if (!res.hasErrors) {
      setData(res.value.items);
    }
  }

  const columns = [
    {
      title: "#",
      dataIndex: "age",
      key: "age",
      width: "6%",
      render: (text, row, index) => index + 1,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      width: "55%",
      render: (text, row, index) => <a onClick={() => toggleModal()}>{text}</a>,
    },
    {
      title: "Created date",
      dataIndex: "createdTime",
      key: "createdTime",
      width: "25%",
      render: (text, row, index) => displayDateTime(text),
    },
    {
      title: "",
      key: "action",
      render: (text, row) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(row.id)}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={"notification-page"}>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => {
          return {
            onClick: (event) => {
              setModelForEdit(record);
            },
          };
        }}
        rowClassName={(record: INotificationModel, index) =>
          !record.isSeen ? "seen-content" : "no-seen-content"
        }
      />
      <NotificationModal
        fetchData={fetchNotificaiton}
        data={modelForEdit}
        onCancel={toggleModal}
        visible={isModal}
      />
    </div>
  );
};

export default NoficationPage;
