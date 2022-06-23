import {
  AppstoreAddOutlined,
  ExportOutlined,
  FileExcelOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import ReportFieldModal from "@Components/modals/Admin/ReportFieldModel";
import { IFilterType } from "@Models/IFilterType";
import { IReportFieldModel } from "@Models/IReportFieldModel";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import ReportFieldService from "@Services/ReportFieldService";
import ReportService from "@Services/ReportService";
import SupportCategoryService from "@Services/SupportCategoryService";
import {
  Button,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import React, { useEffect } from "react";
import { Edit2, Trash2 } from "react-feather";

type Props = {};

const options = [
  { name: "Full Name", value: "fullName" },
  { name: "Birthday", value: "dob" },
  { name: "Address", value: "detailAddress" },
  { name: "Gender", value: "gender" },
  { name: "Circumstance", value: "circumstance" },
  { name: "Guardian Name", value: "guardianName" },
  { name: "Other", value: "other" },
];

const reportFieldService = new ReportFieldService();

const ReportFieldCategoryPage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [reports, setReport] = React.useState<IReportFieldModel[]>([]);
  const [filterValue, setFilterValue] = React.useState<string>();
  const [isModal, setModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] = React.useState<IReportFieldModel>();
  const [filterBy, setFilterBy] = React.useState<string>("title");

  useEffect(() => {
    document.title = "Report Field";
    fetchData();
  }, []);
  useEffect(() => {
    onSearch();
  }, [filterValue]);

  function findName(v) {
    let result = "";
    options.map((o) => {
      if (o.value === v) {
        result = o.name;
      }
    });
    return result;
  }

  const excelColumns: IExcelColumn[] = [
    {
      title: "#",
      dataIndex: "",
      width: 50,
      render: (text, row, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text: string) => (
        <a className="item-title" onClick={toggleModal}>
          {findName(text)}
        </a>
      ),
    },
    {
      title: "Created time",
      dataIndex: "createdTime",
      render: (text: Date, row, index) => (
        <>{text ? displayDateTime(text) : displayDateTime(row.lastModified)}</>
      ),
    },
  ];

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      ellipsis: true,
      width: "10%",
      align: "center",
      render: (text, row, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "fullName",
      ellipsis: true,
      width: "40%",
      columnSearchDataIndex: "fullName",
      render: (text: string) => (
        <a className="item-title" onClick={toggleModal}>
          {findName(text)}
        </a>
      ),
    },
    {
      title: "Created time",
      dataIndex: "createdTime",
      key: "createdTime",
      ellipsis: true,
      width: "38%",
      render: (text: Date, row, index) => (
        <>{text ? displayDateTime(text) : displayDateTime(row.lastModified)}</>
      ),
    },
    {
      align: "center",
      render: (text, record, index) => (
        <Space className="actions">
          <Button
            onClick={toggleModal}
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
    fetchReport();
  }

  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(excelColumns)
      .addDataSource(reports, {
        str2Percent: true,
      })
      .saveAs("Report.xlsx");
  };

  async function onDelete(id: number) {
    const res = await reportFieldService.delete(id);
    if (!res.hasErrors) {
      message.success("Category deleted sucessfully");
      fetchData();
    }
  }

  async function toggleModal() {
    setModal(!isModal);
    setmodelForEdit(null);
  }

  async function onSearch() {
    const value: IFilterType = { [filterBy]: filterValue };
    const res = await reportFieldService.search(value);
    if (!res.hasErrors) {
      setReport(res.value.items);
    }
  }

  async function fetchReport() {
    const dataRes = await reportFieldService.getAll();
    if (!dataRes.hasErrors) {
      setReport(dataRes.value.items);
    }
  }

  return (
    <div className="table-container">
      <div className="option-panel">
        <Row justify="start">
          <Col span={14} className="table-title">
            Report Field Category
          </Col>
          <Col span={7}>
            <div className="option-pannel">
              <Input
                style={{
                  width: "100%",
                  fontSize: "14px",
                  borderRadius: "25px",
                }}
                placeholder="Input support title"
                prefix={<SearchOutlined className="site-form-item-icon" />}
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
              onClick={toggleModal}
              danger
            >
              <AppstoreAddOutlined />
            </Button>
            <Button
              onClick={handleClick}
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

      <ReportFieldModal
        visible={isModal}
        onCancel={toggleModal}
        data={modelForEdit}
        fetchData={fetchData}
        reportField={reports}
      />
    </div>
  );
};

export default ReportFieldCategoryPage;
