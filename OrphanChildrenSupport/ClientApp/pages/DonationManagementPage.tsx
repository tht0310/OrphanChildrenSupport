import {
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import ChildrenProfileModal from "@Components/modals/ChildrenProfileModal";

import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IFilterType } from "@Models/IFilterType";
import { IPersonalProfileModel } from "@Models/IPersonalProfileModel";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import PersonalProfileService from "@Services/PersonalProfileService";
import PersonService from "@Services/PersonService";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";

import * as React from "react";
import { useEffect } from "react";
import { Edit2, Plus, Trash2, UserPlus } from "react-feather";
type Props = {};

const childrenProfileService = new ChildrenProfileService();

const DonationManagementPage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [childrenProfiles, setchildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [filterBy, setFilterBy] = React.useState<string>("fullName");
  const [filterValue, setFilterValue] = React.useState<string>();
  const [isChildrenModal, setChildrenModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] =
    React.useState<IChildrenProfileModel>();

  useEffect(() => {
    document.title = "Dashboard - Quy trình";
    fetchData();
  }, []);
  useEffect(() => {
    onSearch();
  }, [filterBy, filterValue]);

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
        <a className="item-title" onClick={toggleChildrenModal}>
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
      title: "Address",
      columnSearchDataIndex: "detailAddress",
      dataIndex: "detailAddress",
      width: "25%",
      key: "detailAddress",
      render: (text: string) => convertAddressToString(text),
    },
    {
      title: "Guardian Phone",
      dataIndex: "guardianPhoneNumber",
      width: "14%",
      key: "guardianPhoneNumber",
      columnSearchDataIndex: "guardianPhoneNumber",
    },
    {
      columnSearchDataIndex: "address",
      align: "center",
      dataIndex: "address",
      key: "address",
      render: (text, record, index) => (
        <Space className="actions">
          <Button
            onClick={toggleChildrenModal}
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

  async function fetchData() {
    fetchchildrenProfile();
  }

  function convertAddressToString(address: string) {
    const tempAddress = address.split("-");
    let result = "";
    tempAddress.reverse();
    tempAddress.map((v) => {
      result += v + " ";
    });

    return result;
  }

  async function onDelete(id: number) {
    const res = await childrenProfileService.delete(id);
    if (!res.hasErrors) {
      message.success(`Children deleted sucessfully`);
      fetchData();
    }
  }

  async function toggleChildrenModal() {
    setChildrenModal(!isChildrenModal);
    setmodelForEdit(null);
  }

  async function onSearch() {
    const value: IFilterType = { [filterBy]: filterValue };
    const res = await childrenProfileService.search(value);
    console.log(value);
    if (!res.hasErrors) {
      setchildrenProfiles(res.value.items);
    }
  }

  async function fetchchildrenProfile() {
    const dataRes = await childrenProfileService.getAll();
    if (!dataRes.hasErrors) {
      setchildrenProfiles(dataRes.value.items);
    }
  }

  return (
    <div className="table-container">
      <div className="option-panel">
        <Row justify="start">
          <Col span={12} className="table-title">
            Donation Information
          </Col>
          <Col span={12}>
            <div className="option-pannel">
              <Input.Group compact>
                <Select
                  defaultValue="fullName"
                  style={{ width: "27%" }}
                  onChange={(e) => {
                    setFilterBy(e);
                  }}
                >
                  <Select.Option value="fullName">FullName</Select.Option>
                  <Select.Option value="address">Address</Select.Option>
                  <Select.Option value="status">Status</Select.Option>
                  <Select.Option value="gender">Gender</Select.Option>
                </Select>
                <Input
                  style={{ width: "50%" }}
                  prefix={<SearchOutlined className="site-form-item-icon" />}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                  }}
                />
                <Button className="new-button" onClick={toggleChildrenModal}>
                  Add New
                </Button>
              </Input.Group>
            </div>
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
        dataSource={childrenProfiles}
        pagination={{ pageSize: 10 }}
        onChange={(e) => {
          setPage(e.current);
        }}
      />
      <ChildrenProfileModal
        visible={isChildrenModal}
        onCancel={toggleChildrenModal}
        data={modelForEdit}
        fetchData={fetchData}
      />
    </div>
  );
};

export default DonationManagementPage;
