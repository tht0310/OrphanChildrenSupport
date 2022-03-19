import { SearchOutlined } from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import SupportCategoryModal from "@Components/modals/SupportCategoryModal";
import { IFilterType } from "@Models/IFilterType";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
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
import React, { useEffect } from "react";
import { PencilFill, Trash2 } from "react-bootstrap-icons";

type Props = {};

const supportCategoriesService = new SupportCategoryService();

const SupportCategoryPage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const [filterValue, setFilterValue] = React.useState<string>();
  const [isSupportCategoriesModal, setSupportCategoriesModal] =
    React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] =
    React.useState<ISupportCategoryModel>();
  const [filterBy, setFilterBy] = React.useState<string>("title");

  useEffect(() => {
    document.title = "Support Categories";
    fetchData();
  }, []);
  useEffect(() => {
    onSearch();
  }, [filterValue]);

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      ellipsis: true,
      width: "5%",
      align: "center",
      render: (text, row, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "fullName",
      ellipsis: true,
      width: "45%",
      columnSearchDataIndex: "fullName",
      render: (text: string) => (
        <a className="item-title" onClick={toggleSupportCategoryModal}>
          {text}
        </a>
      ),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      ellipsis: true,
      width: "20%",
      render: (text: Date, row, index) => <>{text ? text : row.modifiedBy}</>,
    },
    {
      title: "Created time",
      dataIndex: "createdTime",
      key: "createdTime",
      ellipsis: true,
      width: "20%",
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
            icon={<PencilFill size={14} style={{ color: "#40A9FF" }} />}
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

  async function onDelete(id: number) {
    const res = await supportCategoriesService.delete(id);
    if (!res.hasErrors) {
      message.success("Xóa tài khoản thành công");
      fetchData();
    }
  }

  async function toggleSupportCategoryModal() {
    setSupportCategoriesModal(!isSupportCategoriesModal);
    setmodelForEdit(null);
  }

  async function onSearch() {
    const value: IFilterType = { [filterBy]: filterValue };
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
          <Col span={12} className="table-title">
            Support Category
          </Col>
          <Col span={12}>
            <div className="option-pannel">
              <Input.Group compact>
                <Select
                  defaultValue="Name"
                  style={{ width: "27%" }}
                  onChange={(e) => {
                    setFilterBy(e);
                  }}
                >
                  <Select.Option value="fullName">Name</Select.Option>
                </Select>
                <Input
                  style={{ width: "50%" }}
                  prefix={<SearchOutlined className="site-form-item-icon" />}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                  }}
                />
                <Button
                  className="new-button"
                  onClick={toggleSupportCategoryModal}
                >
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
