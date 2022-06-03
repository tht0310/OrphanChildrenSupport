import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import ChildrenProfileService, {
  ChildrenParams,
} from "@Services/ChildrenProfileService";
import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  Row,
  Select,
  Skeleton,
  Spin,
  Tag,
  Image,
  Checkbox,
  Carousel,
  Form,
  Input,
  Slider,
  Pagination,
} from "antd";
import Meta from "antd/lib/card/Meta";
import * as React from "react";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import { DatePicker, Space } from "antd";
import Children1 from "@Images/children-banner.jpg";
import FallBackImage from "@Images/children-default.png";
import Search from "antd/lib/input/Search";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import SupportCategoryService from "@Services/SupportCategoryService";
import { FilterParams } from "@Models/IFilterType";
import { DataServices } from "@Services/DataServices";
import {
  DeleteOutlined,
  EllipsisOutlined,
  EyeOutlined,
  HeartOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
type Props = RouteComponentProps<{}>;

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children/detail";
const supportCategoriesService = new SupportCategoryService();

const ChildrenCartPage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [form] = Form.useForm();
  const [filterParams, setFilterParams] = React.useState<FilterParams>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {
    document.title = "Children list";
    fetchData();
  }, []);
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);

  React.useEffect(() => {
    fetchSupportCategories();
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchChildrenProfile(filterParams);
  }, [filterParams]);

  async function fetchData() {
    fetchChildrenProfile({ childrenProfileStatus: 0 });
  }

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  async function fetchChildrenProfile(filterParams) {
    const dataRes = await childrenProfileService.getAll(filterParams);
    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
    }
  }

  async function onSearchGender(value) {
    fetchChildrenProfile({ gender: value, childrenProfileStatus: 0 });
  }

  async function onSearchFullName(value) {
    fetchChildrenProfile({ fullName: value, childrenProfileStatus: 0 });
  }

  async function onSearchAge(value) {
    fetchChildrenProfile({
      fromAge: value[0],
      toAge: value[1],
      childrenProfileStatus: 0,
    });
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

  return (
    <>
      <Carousel autoplay className="carousel">
        <div>
          <h3
            style={{
              marginTop: "2px",
              height: "30%",
              fontSize: "22px",
              color: "#fff",
              lineHeight: "40px",
              textAlign: "center",
              background: "#88181b",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div>
              <HeartOutlined style={{ marginTop: "50px", fontSize: "25px" }} />
            </div>
            My wishlist
          </h3>
        </div>
      </Carousel>
      <Form form={form} name="filter-form" autoComplete="off">
        <div className="content-wrapper-custom" style={{ marginTop: "10px" }}>
          <Row>
            <Col span={24}>
              <Input
                placeholder="Search by name"
                style={{
                  width: "20%",
                  float: "right",
                  paddingRight: "9%",
                  fontSize: "14px",
                }}
                prefix={<SearchOutlined className="site-form-item-icon" />}
                onChange={(e) => {
                  onSearchFullName(e.target.value);
                }}
              />
            </Col>
          </Row>
        </div>
      </Form>

      <div
        className="content-wrapper-custom"
        style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "5px" }}
      >
        <List
          grid={{ gutter: 25, column: 5 }}
          dataSource={childrenProfiles}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          renderItem={(item) => (
            <List.Item>
              <Link to={`${childrenDetailUrl}/${item.id}`}>
                <div className="item" style={{ marginBottom: "40px" }}>
                  <Card
                    actions={[
                      <Link
                        to={`${childrenDetailUrl}/${item.id}`}
                        target="_blank"
                      >
                        <EyeOutlined key="setting" />
                      </Link>,
                      <DeleteOutlined key="setting" />,
                    ]}
                    bodyStyle={{ padding: "0px", paddingBottom: "8px" }}
                    style={{ marginBottom: "40px" }}
                  >
                    <Image
                      preview={false}
                      className="img-item"
                      src={childrenProfileService.getImageUrl(item.id)}
                      fallback={FallBackImage}
                      alt={"img" + item.id}
                    />
                    <div className="info">
                      <h3>{item.fullName}</h3>
                      <p className="descroption">
                        {displayDate(item.dob)} | Gender:
                        {item.gender ? " Boy" : " Girl"}
                      </p>
                      <p
                        className="descroption"
                        style={{ color: !item?.status ? "#009900" : "red" }}
                      >
                        {!item?.status ? "Waiting supporter" : "Supported"}
                      </p>
                    </div>
                  </Card>
                </div>
              </Link>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default ChildrenCartPage;
