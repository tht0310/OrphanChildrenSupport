import {
  ExportOutlined,
  HistoryOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { CustomColumnType } from "@Components/forms/Table";
import ChildrenProfileModal from "@Components/modals/ChildrenProfileModal";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IFilterType } from "@Models/IFilterType";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { displayDate } from "@Services/FormatDateTimeService";
import {
  Button,
  Col,
  Input,
  InputRef,
  message,
  Popconfirm,
  Row,
  Space,
  Table,
} from "antd";
import * as React from "react";
import { useEffect } from "react";
import { Edit2, Trash2 } from "react-feather";
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from "antd-table-saveas-excel/app";
import { ColumnType, FilterConfirmProps } from "antd/lib/table/interface";
import Highlighter from "react-highlight-words";
import ChildrenHistoryModal from "@Components/modals/ChildrenHistotyModal";

type Props = {};

const childrenProfileService = new ChildrenProfileService();

interface DataType {
  key: string;
  fullName: string;

  detailAddress: string;
}

type DataIndex = keyof DataType;

const ChildrenProfilePage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize] = React.useState<number>(5);
  const [childrenProfiles, setchildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [filterBy, setFilterBy] = React.useState<string>("fullName");
  const [filterValue, setFilterValue] = React.useState<string>();
  const [isChildrenModal, setChildrenModal] = React.useState<boolean>(false);
  const [isHistoryModal, setHistoryModal] = React.useState<boolean>(false);
  const [modelForEdit, setmodelForEdit] =
    React.useState<IChildrenProfileModel>();
  const [searchedColumn, setSearchedColumn] = React.useState("");
  const searchInput = React.useRef<InputRef>(null);
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    document.title = "Children Management";
    fetchData();
  }, []);
  useEffect(() => {
    onSearch();
  }, [filterBy, filterValue]);

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

  const excelColumns: IExcelColumn[] = [
    {
      title: "Full name",
      dataIndex: "fullName",
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
      title: "Address",
      dataIndex: "detailAddress",
      width: 300,
      render: (text: string) => convertAddressToString(text),
    },
    {
      title: "Guardian Name",
      dataIndex: "guardianName",
      width: 200,
    },
    {
      title: "Guardian Phone",
      dataIndex: "guardianPhoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (text ? "Waiting for support " : "Supported"),
    },
  ];

  const requestColumns: CustomColumnType[] = [
    {
      title: "#",
      ellipsis: true,
      width: "6%",
      align: "center",
      render: (text, row, index) => index + 1 + (page - 1) * pageSize,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      ellipsis: true,
      width: "18%",
      ...getColumnSearchProps("fullName"),
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
      filters: [
        { text: "Boy", value: true },
        { text: "Girl", value: false },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => (record.gender === value ? true : false),
      render: (gender: string) => (!gender ? "Girl" : "Boy"),
    },

    {
      title: "Birthday",
      dataIndex: "dob",
      key: "dob",
      width: "11%",
      columnSearchDataIndex: "dob",
      render: (date: string) => displayDate(new Date(date)),
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Address",
      columnSearchDataIndex: "detailAddress",
      dataIndex: "detailAddress",
      ...getColumnSearchProps("detailAddress"),
      width: "23%",
      key: "detailAddress",
      render: (text: string) => convertAddressToString(text),
    },
    {
      title: "Status",
      width: "17%",
      dataIndex: "status",
      render: (text: number) =>
        text === 0 ? "Waiting for support " : "Supported",
      filters: [
        { text: "Waiting for support", value: 0 },
        { text: "Supported", value: 1 },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => (record.status === value ? true : false),
    },
    {
      columnSearchDataIndex: "address",
      align: "center",
      dataIndex: "address",
      key: "address",
      render: (text, record, index) => (
        <Space className="actions" style={{ gap: "0px" }}>
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
          <Button
            onClick={toggleHistoryModal}
            className="btn-custom-2 blue-action-btn"
            icon={<HistoryOutlined size={10} style={{ color: "#FFC000" }} />}
          />
        </Space>
      ),
    },
  ];

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

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

  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(excelColumns)
      .addDataSource(childrenProfiles, {
        str2Percent: true,
      })
      .saveAs("Children.xlsx");
  };

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

  async function toggleHistoryModal() {
    setHistoryModal(!isHistoryModal);
    setmodelForEdit(null);
  }

  async function onSearch() {
    const value: IFilterType = { [filterBy]: filterValue };
    const res = await childrenProfileService.search(value);
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
        <Row>
          <Col span={14} className="table-title">
            Children Information
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
                placeholder={"Input children name"}
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
              onClick={toggleChildrenModal}
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
        dataSource={childrenProfiles}
        pagination={{ pageSize: pageSize }}
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
      <ChildrenHistoryModal
        visible={isHistoryModal}
        onCancel={toggleHistoryModal}
      />
    </div>
  );
};

export default ChildrenProfilePage;
