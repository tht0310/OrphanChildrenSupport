import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Input,
  Menu,
  Pagination,
  Popover,
  Row,
  Select,
  Table as AntTable,
} from "antd";
import { ColumnType, TableProps } from "antd/lib/table";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { ChevronDown, ChevronRight, Columns } from "react-feather";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { ColumnTitle } from "antd/lib/table/interface";

type FilterParam = {
  name: string;
  value: string | number | boolean;
};

export type FilterParams = FilterParam[];
type FilterBy = "text" | "dates";
interface Props extends TableProps<any> {
  currentPage?: number;
  totalRecords?: number;
  pageSize?: number;
  columns: CustomColumnType[];
  filterParams?: FilterParams;
  isShowPagination?: boolean;
  onChangeFilters?: (params: FilterParams) => void;
  onChangePage?: (page: number, pageSize?: number) => void;
  loading?: boolean;
  isVirtualPaging?: boolean;
}

export interface CustomColumnType extends ColumnType<any> {
  columnSearchDataIndex?: string | number;
  filterBy?: FilterBy;
}

type FilterColumnType = {
  name: any;
  title?: ColumnTitle<any>;
};

const filterOptions = [
  { name: "1", title: "Chứa" },
  { name: "2", title: "Bằng" },
  { name: "3", title: "Không bằng" },
  { name: "4", title: "Bắt đầu bằng" },
  { name: "5", title: "Không chứa" },
  { name: "6", title: "Kết thúc với" },
  { name: "7", title: "NULL" },
  { name: "8", title: "Khác NULL" },
  { name: "9", title: "Rỗng" },
  { name: "10", title: "Khác rỗng" },
];

interface TableComponentProps extends Props {
  selectedFilter: CheckboxValueType[];
  onChangeSelectedFilter: (values: CheckboxValueType[]) => void;
  loading?: boolean;
}

const TableComponent: FC<TableComponentProps> = ({
  dataSource,
  columns,
  isShowPagination = true,
  currentPage = 1,
  totalRecords,
  pageSize = 20,
  filterParams,
  onChangeFilters,
  selectedFilter,
  onChangeSelectedFilter,
  onChangePage,
  scroll,
  loading,
  rowSelection,
  rowKey,
  isVirtualPaging = false,
}: TableComponentProps) => {
  const [columns2, setColumns2] = useState<CustomColumnType[]>([]);

  const [filterColumns, setFilterColumns] = useState<FilterColumnType[]>([]);

  const filterSection = (
    <div className="table-filter__filter">
      <b>Mã yêu cầu</b>
      <Select style={{ width: "100%", marginBottom: 5 }}>
        {filterOptions.map((option) => (
          <Select.Option value={option.name} key={option.name}>
            {option.title}
          </Select.Option>
        ))}
      </Select>
      <Input />
      <div className="table-filter_actions">
        <Row gutter={12}>
          <Col span={12}>
            <Button size="small" type="primary" block>
              Lọc
            </Button>
          </Col>
          <Col span={12}>
            <Button size="small" type="primary" block danger>
              Xóa
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );

  function onChangeFilterColumns(filterCols: CheckboxValueType[]) {
    const columnsTmp = columns.filter(
      (col) => !filterCols.some((colName) => colName === col.dataIndex)
    );
    const columns2Tmp: CustomColumnType[] = [];
    columnsTmp.map((col) => {
      let colTmp = { ...col };
      const dataIndex = col.columnSearchDataIndex;
      if (dataIndex) {
        colTmp = {
          ...colTmp,
          ...getColumnSearchProps(dataIndex, col.filterBy),
        };
      }
      columns2Tmp.push(colTmp);
    });
    onChangeSelectedFilter(filterCols);
    setColumns2(columns2Tmp);
  }

  const filterColumnsSection = () => {
    return (
      <div className="table-filter__filter-columns">
        <Checkbox.Group
          style={{ width: "100%" }}
          onChange={(values) => onChangeFilterColumns(values)}
          value={selectedFilter}
        >
          <Row>
            {filterColumns.map((col) => (
              <Col span={24} key={col.name}>
                <Checkbox value={col.name}>{col.title}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
    );
  };

  const handleSort = useCallback(
    (dataIndex: string | number, isSortAscending: boolean) => {
      let params = [...filterParams];
      const isAscIndex = params.findIndex(
        (param) => param.name === "isSortAscending"
      );
      const sortByIndex = params.findIndex((param) => param.name === "sortBy");

      // -1 is not found
      if (isAscIndex !== -1 && sortByIndex !== -1) {
        if (params[isAscIndex].value === isSortAscending) {
          if (params[sortByIndex].value === dataIndex) {
            params = params.slice(sortByIndex, 1);
            params = params.slice(isAscIndex, 1);
          } else {
            params[sortByIndex].value = dataIndex;
          }
        } else {
          params[isAscIndex].value = isSortAscending;
          params[sortByIndex].value = dataIndex;
        }
      } else {
        params.push({
          name: "isSortAscending",
          value: isSortAscending,
        });

        params.push({
          name: "sortBy",
          value: dataIndex,
        });
      }
      onChangeFilters(params);
    },
    [filterParams]
  );

  const getColumnSearchProps = (
    dataIndex: string | number,
    filterBy: FilterBy
  ) => ({
    filterDropdown: ({}) => {
      const selectedKeys = [];
      const sortBy = filterParams?.find((param) => param.name === "sortBy");
      const orderSort = filterParams?.find(
        (param) => param.name === "isSortAscending"
      );
      if (sortBy && orderSort) {
        if (sortBy.value === dataIndex) {
          if (orderSort.value === true) {
            selectedKeys.push("asc");
          } else {
            selectedKeys.push("desc");
          }
        }
      }
      return (
        <div className="table-filter">
          <Menu
            style={{ width: 160 }}
            mode="vertical"
            openKeys={[]}
            selectedKeys={selectedKeys}
          >
            <Menu.Item
              key="asc"
              icon={<SortAscendingOutlined />}
              onClick={() => handleSort(dataIndex, true)}
            >
              Sắp xếp tăng dần
            </Menu.Item>
            <Menu.Item
              key="desc"
              icon={<SortDescendingOutlined />}
              onClick={() => handleSort(dataIndex, false)}
            >
              Sắp xếp giảm dần
            </Menu.Item>
            <Popover
              placement="rightTop"
              content={filterColumnsSection}
              trigger="hover"
              key="3"
              overlayClassName="table-filter__sub-content"
            >
              <Menu.Item key="sub3" icon={<Columns />} className="sub-menu">
                Các cột <ChevronRight className="suffix-icon" />
              </Menu.Item>
            </Popover>
            {/* <Popover
              placement="rightTop"
              content={filterSection}
              trigger="hover"
              key="4"
              overlayClassName="table-filter__sub-content"
            >
              <Menu.Item key="sub4" icon={<Filter />} className="sub-menu">
                Bộ lọc <ChevronRight className="suffix-icon" />
              </Menu.Item>
            </Popover> */}
          </Menu>
        </div>
      );
    },
    filterIcon: () => <ChevronDown strokeWidth={1} />,
  });

  useEffect(() => {
    const columnsTmp: CustomColumnType[] = [];

    columns?.map((col) => {
      let colTmp = { ...col };
      const dataIndex = col.columnSearchDataIndex;
      if (dataIndex) {
        colTmp = {
          ...colTmp,
          ...getColumnSearchProps(dataIndex, col.filterBy),
        };
      }

      columnsTmp.push(colTmp);
    });
    setColumns2(columnsTmp);
  }, [filterColumns]);

  useEffect(() => {
    fetchFilterColumns(columns);
  }, [columns]);

  function fetchFilterColumns(cols: CustomColumnType[]) {
    const filterColumnsTmp: FilterColumnType[] = [];

    cols?.map((col) => {
      let colTmp = { ...col };
      const searchDataIndex = col.columnSearchDataIndex;
      if (searchDataIndex) {
        colTmp = {
          ...colTmp,
          ...getColumnSearchProps(searchDataIndex, col.filterBy),
        };
      }

      filterColumnsTmp.push({ name: col.dataIndex, title: col.title });
    });

    setFilterColumns(filterColumnsTmp);
  }

  useEffect(() => {
    const columnsTmp: CustomColumnType[] = [];

    columns?.map((col) => {
      if (selectedFilter.some((filter) => filter === col.dataIndex)) {
        let colTmp = { ...col };
        const searchDataIndex = col.columnSearchDataIndex;
        if (searchDataIndex) {
          colTmp = {
            ...colTmp,
            ...getColumnSearchProps(searchDataIndex, col.filterBy),
          };
        }
        columnsTmp.push(colTmp);
      }
    });
    setColumns2(columnsTmp);
  }, [selectedFilter]);

  return (
    <div className="custom-table">
      <AntTable
        className="table-striped-rows"
        dataSource={dataSource}
        columns={columns2}
        pagination={
          isVirtualPaging ? { className: "custom-table__pagination" } : false
        }
        scroll={scroll}
        loading={loading}
        rowSelection={rowSelection}
        rowKey={rowKey}
      />
      {isShowPagination === true && (
        <div className="custom-table__pagination">
          <Pagination
            current={currentPage}
            total={totalRecords}
            pageSize={pageSize}
            showSizeChanger={false}
            onChange={onChangePage}
          />
        </div>
      )}
    </div>
  );
};

const Table: FC<Props> = (props: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<CheckboxValueType[]>();

  function onChangeSelectedFilter(values: CheckboxValueType[]) {
    setSelectedFilter(values);
  }

  useEffect(() => {
    const selectedFilterTmp: CheckboxValueType[] = [];
    props.columns.map((col) => {
      selectedFilterTmp.push(col.dataIndex?.toString());
    });
    setSelectedFilter(selectedFilterTmp);
  }, []);

  return (
    <div>
      {selectedFilter && (
        <TableComponent
          {...props}
          selectedFilter={selectedFilter}
          onChangeSelectedFilter={onChangeSelectedFilter}
        />
      )}
    </div>
  );
};

export default Table;
