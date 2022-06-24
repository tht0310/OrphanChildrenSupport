import {
  ExportOutlined,
  FileExcelOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import RegisteredUserProfileModal from "@Components/modals/Admin/RegisteredUserProfileModel";
import { IRegisterModel } from "@Models/ILoginModel";
import AccountService from "@Services/AccountService";
import { displayDate } from "@Services/FormatDateTimeService";
import {
  Button,
  Col,
  Input,
  InputRef,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnType } from "antd/lib/table";
import { FilterConfirmProps } from "antd/lib/table/interface";
import Boy from "@Images/boy.png";
import Girl from "@Images/girl.png";
import * as React from "react";
import { useEffect } from "react";
import { Edit2, Trash2 } from "react-feather";
import Highlighter from "react-highlight-words";

type Props = {};

const userService = new AccountService();

interface DataType {
  key: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

type DataIndex = keyof DataType;

const VolunteerPage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [userProfiles, setUserProfiles] = React.useState<IRegisterModel[]>([]);
  const [filterBy, setFilterBy] = React.useState<string>("fullName");
  const [filterValue, setFilterValue] = React.useState<string>();
  const [isModal, setModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] = React.useState<IRegisterModel>();
  const searchInput = React.useRef<InputRef>(null);
  const [searchText, setSearchText] = React.useState("");
  const [searchedColumn, setSearchedColumn] = React.useState("");
  useEffect(() => {
    document.title = "System User";
    fetchData();
  }, []);
  useEffect(() => {
    onSearch();
  }, [filterBy, filterValue]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps("fullName"),
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
      align: "center",
      width: "12%",
      columnSearchDataIndex: "gender",
      filters: [
        { text: "Boy", value: true },
        { text: "Girl", value: false },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => (record.gender === value ? true : false),
      render: (gender: string) => (!gender ? "Female" : "Male"),
    },

    {
      title: "Birthday",
      dataIndex: "dob",
      key: "dob",
      align: "center",
      width: "12%",
      columnSearchDataIndex: "dob",
      sorter: (a, b) => a.age - b.age,
      render: (date: string) => displayDate(new Date(date)),
    },
    {
      title: "Email",
      columnSearchDataIndex: "email",
      dataIndex: "email",
      align: "center",
      width: "25%",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: "14%",
      align: "center",
      key: "phoneNumber",
      ...getColumnSearchProps("phoneNumber"),
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
      render: (gender: string) => (!gender ? "Female" : "Male"),
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

  async function onDelete(id) {
    const res = await userService.delete(id);
    if (!res.hasErrors) {
      message.success("Delete successfully");
      fetchData();
    } else {
      message.error("An error occurred during deletion");
    }
  }

  async function fetchUserProfile() {
    const res = await userService.getAll({ role: "1" });
    if (!res.hasErrors) {
      setUserProfiles(res.value.items);
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

  async function onSearch() {
    const searchValue = { [filterBy]: filterValue, role: "1" };
    const res = await userService.getAll(searchValue);
    if (!res.hasErrors) {
      setUserProfiles(res.value.items);
    }
  }

  return (
    <div className="table-container" style={{ minHeight: "480px" }}>
      <div className="option-panel">
        <Row justify="start">
          <Col span={14} className="table-title">
            System Users
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

export default VolunteerPage;
