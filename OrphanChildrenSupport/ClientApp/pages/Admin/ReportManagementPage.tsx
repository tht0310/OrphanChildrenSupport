import {
  AppstoreAddOutlined,
  ExportOutlined,
  FileExcelOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IDonationModel } from "@Models/IDonationModel";
import { IFilterType } from "@Models/IFilterType";
import { IRegisterModel } from "@Models/ILoginModel";
import { IReportDetailModel, IReportModel } from "@Models/IReportModel";
import AccountService from "@Services/AccountService";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { getStatus } from "@Services/FormatStatusService";
import ReportService from "@Services/ReportService";
import {
  Button,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
} from "antd";

import * as React from "react";
import { useEffect } from "react";
import { Edit2, Trash2 } from "react-feather";
import { Link } from "react-router-dom";
type Props = {};

const reportService = new ReportService();
const userService = new AccountService();
const childrenService = new ChildrenProfileService();

const ReportManagementPage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [filterBy, setFilterBy] = React.useState<string>("fullName");
  const [filterValue, setFilterValue] = React.useState<string>();
  const [isModal, setModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] = React.useState<IDonationModel>();
  const [reports, setReport] = React.useState<IReportModel[]>([]);
  const [childrenProfiles, setchildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [userProfiles, setUserProfiles] = React.useState<IRegisterModel[]>([]);
  const [detailStatus, setDetailStatus] = React.useState<number>();

  useEffect(() => {
    document.title = "Report Incorrect Information";
    fetchData();
  }, []);
  useEffect(() => {
    onSearch();
  }, [filterBy, filterValue]);

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      ellipsis: true,
      width: "8%",
      align: "center",
      render: (text, row, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: "Report Code",
      ellipsis: true,
      width: "16%",
      align: "center",
      render: (text, row, index) => (
        <Link to={`/admin/activityManagement/reports/${row.id}`}>
          RC{10000 + row.id}
        </Link>
      ),
    },
    {
      title: "Children",
      dataIndex: "childrenProfileId",
      key: "childrenProfileId",
      ellipsis: true,
      align: "center",
      width: "22%",
      columnSearchDataIndex: "childrenProfileId",
      render: (text, row, index) =>
        findUserbyId(text, childrenProfiles) >= 0
          ? childrenProfiles[findUserbyId(text, childrenProfiles)].fullName
          : "",
    },
    {
      title: "User",
      dataIndex: "accountId",
      ellipsis: true,
      align: "center",
      width: "22%",
      columnSearchDataIndex: "accountId",
      render: (text, row, index) =>
        findUserbyId(text, userProfiles) >= 0
          ? userProfiles[findUserbyId(text, userProfiles)].fullName
          : "",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "18%",
      render: (text, row, index) => (
        <Tag color={text === 0 ? "blue" : text === 3 ? "green" : "gold"}>
          {getStatus(text)}
        </Tag>
      ),
    },
    {
      columnSearchDataIndex: "address",
      align: "center",
      dataIndex: "address",
      key: "address",
      render: (text, record, index) => (
        <Space className="actions">
          <Link to={`/admin/activityManagement/reports/${record.id}`}>
            <Button
              onClick={toggleModal}
              className="btn-custom-2 blue-action-btn"
              icon={<Edit2 size={14} style={{ color: "#40A9FF" }} />}
            />
          </Link>
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
    fetchUserProfile();
    fetchDonation();
    fetchChildrenProfile();
  }

  async function fetchChildrenProfile() {
    const dataRes = await childrenService.getAll();
    if (!dataRes.hasErrors) {
      setchildrenProfiles(dataRes.value.items);
    }
  }

  async function fetchUserProfile() {
    const res = await userService.getAll();
    if (!res.hasErrors) {
      setUserProfiles(res.value.items);
    }
  }

  async function fetchDonation() {
    const dataRes = await reportService.getAll();
    if (!dataRes.hasErrors) {
      setReport(dataRes.value.items);
    }
  }

  function findUserbyId(id: number, list) {
    const index = list.findIndex((item) => id === item.id);
    return index;
  }

  async function onDelete(id: number) {
    const res = await reportService.delete(id);
    if (!res.hasErrors) {
      message.success(`Report deleted sucessfully`);
      fetchData();
    }
  }

  async function toggleModal() {
    setModal(!isModal);
    setmodelForEdit(null);
  }

  async function onSearch() {
    const value: IFilterType = { [filterBy]: filterValue };
    const res = await reportService.search(value);
    if (!res.hasErrors) {
      setReport(res.value.items);
    }
  }

  return (
    <div className="table-container">
      <div className="option-panel">
        <Row>
          <Col span={14} className="table-title">
            Reports
          </Col>
          <Col span={8}>
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
                placeholder={"Input title"}
                onChange={(e) => {
                  setFilterValue(e.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Button
              // onClick={handleClick}
              style={{ padding: "4px 10px" }}
              danger
            >
              <FileExcelOutlined />
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
        dataSource={reports}
        pagination={{ pageSize: 10 }}
        onChange={(e) => {
          setPage(e.current);
        }}
      />
    </div>
  );
};

export default ReportManagementPage;
