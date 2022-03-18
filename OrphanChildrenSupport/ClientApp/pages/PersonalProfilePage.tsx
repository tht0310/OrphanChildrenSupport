import { CustomColumnType } from "@Components/forms/Table";
import PersonalProfileModal from "@Components/modals/PersonalProfileModal";
import { IPersonalProfileModel } from "@Models/IPersonalProfileModel";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import PersonalProfileService from "@Services/PersonalProfileService";
import PersonService from "@Services/PersonService";
import { Button, Input, message, Popconfirm, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import * as React from "react";
import { useEffect } from "react";
import { PencilFill } from "react-bootstrap-icons";
import { Edit2, Plus, Trash2, UserPlus } from "react-feather";
type Props = {};

const personalProfileService = new PersonalProfileService();

const PersonalProfilePage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [personalProfiles, setpersonalProfiles] = React.useState<
    IPersonalProfileModel[]
  >([]);

  const [isPersonModal, setPersonModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] =
    React.useState<IPersonalProfileModel>();

  useEffect(() => {
    document.title = "Dashboard - Quy trình";
    fetchData();
  }, []);

  const requestColumns: CustomColumnType[] = [
    {
      title: "STT",
      ellipsis: true,
      width: "10%",
      align: "center",
      render: (text, row, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      ellipsis: true,
      width: "20%",
      columnSearchDataIndex: "fullName",
      render: (text: string) => (
        <a className="item-title" onClick={togglePersonModal}>
          {text}
        </a>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: "10%",
      key: "gender",
      columnSearchDataIndex: "gender",
      render: (text, row, index) => (text ? "Nam" : "Nữ"),
    },

    {
      title: "Ngày sinh",
      dataIndex: "birthDay",
      key: "birthDay",
      width: "15%",
      columnSearchDataIndex: "birthDay",
      render: (date: string) => displayDate(new Date(date)),
    },
    {
      title: "Địa chỉ",
      columnSearchDataIndex: "address",
      dataIndex: "address",
      width: "17%",
      key: "address",
    },
    {
      columnSearchDataIndex: "address",
      dataIndex: "address",
      key: "address",
      render: (text, record, index) => (
        <Space className="actions">
          <Button
            icon={<PencilFill size={16} />}
            type="primary"
            ghost
            onClick={() => togglePersonModal()}
            size="small"
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa tài khoản này？"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => onDelete(record.id)}
          >
            <Button
              icon={<Trash2 size={16} />}
              type="primary"
              ghost
              danger
              className="button-custom"
            ></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  async function fetchData() {
    fetchPersonalProfile();
  }

  async function onDelete(id: number) {
    const res = await personalProfileService.delete(id);
    if (!res.hasErrors) {
      message.success("Xóa tài khoản thành công");
      fetchData();
    }
  }

  async function togglePersonModal() {
    setPersonModal(!isPersonModal);
  }

  async function onSearch(value: string) {
    const res = await personalProfileService.search(value);
    if (!res.hasErrors) {
      setpersonalProfiles(res.value.items);
    }
  }

  async function fetchPersonalProfile() {
    const dataRes = await personalProfileService.getAll();

    if (!dataRes.hasErrors) {
      setpersonalProfiles(dataRes.value.items);
    }
  }

  return (
    <div>
      <h4 className="title-common">Thông Tin Cá Nhân</h4>
      <div className="option-panel">
        <div className="search-pannel">
          <Search
            placeholder="Tìm kiếm"
            className="input-custom"
            style={{ width: 200, color: "red" }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="add">
          <div
            onClick={() => {
              togglePersonModal(), setmodelForEdit(null);
            }}
          >
            <UserPlus size={25} color="#1890ff" /> Thêm mới
          </div>
        </div>
      </div>
      <Table
        columns={requestColumns}
        onRow={(record) => {
          return {
            onClick: (event) => {
              setmodelForEdit(record);
            },
          };
        }}
        dataSource={personalProfiles}
        pagination={{ pageSize: 10 }}
        onChange={(e) => {
          setPage(e.current);
        }}
      />
      <PersonalProfileModal
        visible={isPersonModal}
        onCancel={togglePersonModal}
        data={modelForEdit}
        fetchData={fetchData}
      />
    </div>
  );
};

export default PersonalProfilePage;
