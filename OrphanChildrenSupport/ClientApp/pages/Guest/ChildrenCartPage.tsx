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
  Popconfirm,
  message,
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
import FavoriteService from "@Services/FavoriteService";
import { IFavoriteModel } from "@Models/IFavoriteModel";

const { RangePicker } = DatePicker;
type Props = RouteComponentProps<{}>;

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children/detail";
const supportCategoriesService = new SupportCategoryService();
const favouriteChildrenService = new FavoriteService();

const ChildrenCartPage: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [form] = Form.useForm();
  const [filterParams, setFilterParams] = React.useState<FilterParams>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [favouriteChildren, setFavouriteChildren] = React.useState<
    IFavoriteModel[]
  >([]);
  const [favourites, setFavourites] = React.useState<IFavoriteModel[]>([]);
  useEffect(() => {
    document.title = "Children list";
    fetchData();
  }, []);

  React.useEffect(() => {
    fetchData();
    fetchFavourite();
  }, []);

  React.useEffect(() => {
    if (childrenProfiles.length > 0 && favourites.length > 0) {
      fetchChildrenFavourite();
    }
  }, [childrenProfiles, favourites]);

  React.useEffect(() => {
    fetchChildrenProfile(filterParams);
  }, [filterParams]);

  async function fetchData() {
    fetchChildrenProfile({ childrenProfileStatus: 0 });
  }

  async function fetchFavourite() {
    const dataRes = await favouriteChildrenService.getAll();
    if (!dataRes.hasErrors) {
      setFavourites(dataRes.value.items);
    }
  }

  async function fetchChildrenFavourite() {
    const tempData = [];
    for (let index = 0; index < favourites.length; index++) {
      const findIndex = childrenProfiles.findIndex(
        (item) => favourites[0].childrenProfileId === item.id
      );
      const temp: IFavoriteModel = favourites[index];
      temp.childrenProfile = childrenProfiles[findIndex];
      tempData.push(temp);
    }
    setFavouriteChildren(tempData);
  }

  async function fetchChildrenProfile(filterParams?) {
    const dataRes = await childrenProfileService.getAll(filterParams);
    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
    }
  }

  async function onSearchFullName(value) {
    fetchChildrenProfile({ fullName: value, childrenProfileStatus: 0 });
  }

  async function onDelete(id) {
    const res = await favouriteChildrenService.delete(id);
    if (!res.hasErrors) {
      message.success("Remove sucessfully");
      fetchData();
      fetchFavourite();
      fetchChildrenProfile();
      fetchChildrenFavourite();
    }
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
              <HeartOutlined style={{ marginTop: "75px", fontSize: "25px" }} />
            </div>
            My favourite children
          </h3>
        </div>
      </Carousel>
      <Form form={form} name="filter-form" autoComplete="off">
        <div className="content-wrapper-custom " style={{ marginTop: "10px" }}>
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
        className="content-wrapper-custom favourite-page"
        style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "5px" }}
      >
        <List
          grid={{
            gutter: 16,
            xs: 2,
            sm: 3,
            md: 6,
            lg: 6,
            xl: 6,
            xxl: 6,
          }}
          dataSource={favouriteChildren}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          renderItem={(item) => (
            <List.Item>
              <div className="item" style={{ marginBottom: "40px" }}>
                <Card
                  actions={[
                    <Row className="actions">
                      <Col span={12}>
                        <Link to={`${childrenDetailUrl}/${item.id}`}>
                          <EyeOutlined />
                        </Link>
                      </Col>

                      <Col span={12}>
                        <Popconfirm
                          title="Are you sure？"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => onDelete(item.id)}
                        >
                          <DeleteOutlined />
                        </Popconfirm>
                      </Col>
                    </Row>,
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
                    <h3>{item?.childrenProfile?.fullName}</h3>
                    <p className="descroption">
                      {displayDate(item?.childrenProfile?.dob)} | Gender:
                      {item?.childrenProfile?.gender ? " Boy" : " Girl"}
                    </p>
                    <p
                      className="descroption"
                      style={{
                        color: !item?.childrenProfile?.status
                          ? "#009900"
                          : "red",
                      }}
                    >
                      {!item?.childrenProfile?.status
                        ? "Waiting supporter"
                        : "Supported"}
                    </p>
                  </div>
                </Card>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default ChildrenCartPage;
