import {
  AppstoreAddOutlined,
  ExportOutlined,
  FileExcelOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import SupportCategoryModal from "@Components/modals/Admin/SupportCategoryModal";

import { IFilterType } from "@Models/IFilterType";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { displayDateTime } from "@Services/FormatDateTimeService";
import SupportCategoryService from "@Services/SupportCategoryService";
import {
  Button,
  Col,
  Input,
  message,
  Popconfirm,
  Row,
  Space,
  Table,
} from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import React, { useEffect } from "react";
import { Edit2, Trash2 } from "react-feather";

type Props = {};

const supportCategoriesService = new SupportCategoryService();

const SupportCategoryPage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [isSupportCategoriesModal, setSupportCategoriesModal] =
    React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] =
    React.useState<ISupportCategoryModel>();
  const [filterBy, setFilterBy] = React.useState<string>("title");

  useEffect(() => {
    document.title = "Admin - Support Categories | FOR THE CHILDREN";
    fetchData();
  }, []);
  useEffect(() => {
    onSearch();
  }, [filterValue]);

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
        <a className="item-title" onClick={toggleSupportCategoryModal}>
          {text}
        </a>
      ),
    },
    {
      title: "Created Time",
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
        <a className="item-title" onClick={toggleSupportCategoryModal}>
          {text}
        </a>
      ),
    },
    {
      title: "Created Time",
      dataIndex: "createdTime",
      key: "createdTime",
      ellipsis: true,
      width: "36%",
      render: (text: Date, row, index) => (
        <>{text ? displayDateTime(text) : displayDateTime(row.lastModified)}</>
      ),
    },
    {
      align: "center",
      render: (text, record, index) => (
        <Space className="actions">
          <Button
            onClick={toggleSupportCategoryModal}
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
    fetchSupportCategories();
  }

  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(excelColumns)
      .addDataSource(supportCategories, {
        str2Percent: true,
      })
      .saveAs("SupportCategory.xlsx");
  };

  async function onDelete(id: number) {
    const res = await supportCategoriesService.delete(id);
    if (!res.hasErrors) {
      message.success("Category deleted sucessfully");
      fetchData();
    }
  }

  async function toggleSupportCategoryModal() {
    setSupportCategoriesModal(!isSupportCategoriesModal);
    setmodelForEdit(null);
  }

  async function onSearch() {
    const value: IFilterType = { [filterBy]: filterValue };
    console.log(value);
    const res = await supportCategoriesService.search(value);
    if (!res.hasErrors) {
      setSupportCategories(res.value.items);
    }
  }

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  return (
    <div className="table-container">
      <div className="option-panel">
        <Row justify="start">
          <Col span={14} className="table-title">
            Support Categories
          </Col>
          <Col span={7}>
            <div className="option-pannel">
              <Input
                style={{
                  width: "100%",
                  fontSize: "14px",
                  borderRadius: "25px",
                }}
                placeholder="Search by title"
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
              onClick={toggleSupportCategoryModal}
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
        dataSource={supportCategories}
        pagination={{ pageSize: 10 }}
        onChange={(e) => {
          setPage(e.current);
        }}
      />
      <SupportCategoryModal
        visible={isSupportCategoriesModal}
        onCancel={toggleSupportCategoryModal}
        data={modelForEdit}
        fetchData={fetchData}
      />
    </div>
  );
};

export default SupportCategoryPage;
