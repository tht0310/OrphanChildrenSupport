import {
  ExportOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import RegisteredUserProfileModal from "@Components/modals/RegisteredUserProfileModel";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IRegisterModel } from "@Models/ILoginModel";
import AccountService from "@Services/AccountService";
import { displayDate } from "@Services/FormatDateTimeService";
import {
  Button,
  Col,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";

import * as React from "react";
import { useEffect } from "react";
import { Edit2, Trash2 } from "react-feather";
type Props = {};

const userService = new AccountService();

const RegisteredProfilePage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [userProfiles, setUserProfiles] = React.useState<IRegisterModel[]>([]);
  const [filterBy, setFilterBy] = React.useState<string>("fullName");
  const [filterValue, setFilterValue] = React.useState<string>();
  const [isModal, setModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] = React.useState<IRegisterModel>();

  useEffect(() => {
    document.title = "Dashboard - Quy trình";
    fetchData();
  }, []);
  useEffect(() => {
    onSearch();
  }, [filterBy, filterValue]);

  useEffect(() => {
    console.log(userProfiles);
  }, [userProfiles]);

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      ellipsis: true,
      width: "5%",
      align: "center",
      render: (text, row, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      ellipsis: true,
      width: "20%",
      columnSearchDataIndex: "fullName",
      render: (text: string) => (
        <a className="item-title" onClick={toggleUserModal}>
          {text}
        </a>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: "9%",
      columnSearchDataIndex: "dob",
      render: (gender: string) => (!gender ? "Girl" : "Boy"),
    },

    {
      title: "Birthday",
      dataIndex: "dob",
      key: "dob",
      width: "11%",
      columnSearchDataIndex: "dob",
      render: (date: string) => displayDate(new Date(date)),
    },
    {
      title: "Email",
      columnSearchDataIndex: "email",
      dataIndex: "email",
      width: "25%",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      width: "14%",
      key: "phoneNumber",
      columnSearchDataIndex: "phoneNumber",
    },
    {
      columnSearchDataIndex: "address",
      align: "center",
      dataIndex: "address",
      key: "address",
      render: (text, record, index) => (
        <Space className="actions">
          <Button
            onClick={toggleUserModal}
            className="btn-custom-2 blue-action-btn"
            icon={<Edit2 size={14} style={{ color: "#40A9FF" }} />}
          />
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(record.id)}
          >
            <Button
              className="btn-custom-2 red-action-btn"
              icon={<Trash2 size={16} style={{ color: "#FA6D70" }} />}
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const excelColumns: IExcelColumn[] = [
    {
      title: "#",
      dataIndex: "",
      width: 30,
      render: (text, row, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      width: 300,
      render: (text: string) => (
        <a className="item-title" onClick={toggleUserModal}>
          {text}
        </a>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (gender: string) => (!gender ? "Girl" : "Boy"),
    },

    {
      title: "Birthday",
      dataIndex: "dob",
      render: (date: string) => displayDate(new Date(date)),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  async function fetchData() {
    fetchUserProfile();
  }

  function onDelete(id) {}

  async function fetchUserProfile() {
    const res = await userService.getAllUser();
    if (!res.hasErrors) {
      setUserProfiles(res.value);
    }
  }

  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(excelColumns)
      .addDataSource(userProfiles, {
        str2Percent: true,
      })
      .saveAs("User.xlsx");
  };

  async function toggleUserModal() {
    setModal(!isModal);
    setmodelForEdit(null);
  }

  async function onSearch() {}

  return (
    <div className="table-container" style={{ minHeight: "480px" }}>
      <div className="option-panel">
        <Row justify="start">
          <Col span={14} className="table-title">
            User Information
          </Col>
          <Col span={7}>
            <div className="option-pannel">
              <Input
                style={{
                  width: "100%",
                  fontSize: "14px",
                  borderRadius: "25px",
                }}
                prefix={
                  <SearchOutlined
                    style={{ marginRight: "6px" }}
                    className="site-form-item-icon"
                  />
                }
                placeholder={"Input user name"}
                onChange={(e) => {
                  setFilterValue(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={3} style={{ textAlign: "right" }}>
            <Button
              style={{ marginRight: "3px", padding: "4px 10px" }}
              type="primary"
              onClick={toggleUserModal}
              danger
            >
              <UserAddOutlined />
            </Button>
            <Button
              onClick={handleClick}
              style={{ padding: "4px 10px" }}
              danger
            >
              <ExportOutlined />
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        scroll={{ x: 800 }}
        className="ant-table-custom"
        columns={requestColumns}
        onRow={(record) => {
          return {
            onClick: (event) => {
              setmodelForEdit(record);
            },
          };
        }}
        dataSource={userProfiles}
        pagination={{ pageSize: 10 }}
        onChange={(e) => {
          setPage(e.current);
        }}
      />
      <RegisteredUserProfileModal
        visible={isModal}
        onCancel={toggleUserModal}
        item={modelForEdit}
        fetchData={fetchData}
      />
    </div>
  );
};

export default RegisteredProfilePage;