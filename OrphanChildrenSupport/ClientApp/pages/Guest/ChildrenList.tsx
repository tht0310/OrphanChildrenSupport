import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import ChildrenProfileService from "@Services/ChildrenProfileService";
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

const { RangePicker } = DatePicker;
type Props = RouteComponentProps<{}>;

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children/detail";
const supportCategoriesService = new SupportCategoryService();

const ChildrenList: React.FC<Props> = () => {
  const [page, setPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
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
  }, []);

  async function fetchData() {
    fetchChildrenProfile();
  }

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  async function fetchChildrenProfile() {
    const dataRes = await childrenProfileService.getAll();
    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
    }
  }

  return (
    <>
      <Carousel autoplay className="carousel banner-custom">
        <div>
          <h3
            style={{
              height: "70%",
              fontSize: "60px",
              color: "#fff",
              lineHeight: "400px",
              textAlign: "center",
              backgroundImage: `url(${Children1})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></h3>
        </div>
      </Carousel>
      <div className="content-wrapper-custom">
        <div className="table-title"></div>
        <Row>
          <Col span={6}>
            <div className="wrap">
              <div className="menu">
                <div className="mini-menu">
                  <ul>
                    <li className="sub">
                      <a href="#">All</a>
                    </li>
                    <li className="sub">
                      <a href="#">Boys</a>
                    </li>
                    <li className="sub">
                      <a href="#">Girls</a>
                    </li>
                  </ul>
                </div>
                <div className="menu-colors menu-item">
                  <div className="header-item">Birthday</div>
                  <RangePicker picker="year" style={{ margin: "5%" }} />
                </div>
                <div className="menu-size menu-item">
                  <div className="header-item ">Filter By</div>
                  <Checkbox.Group
                    style={{ width: "100%" }}
                    className="checkbox-container"
                  >
                    {supportCategories.map((a) => (
                      <Row>
                        <Checkbox value={a.title}>{a.title}</Checkbox>
                      </Row>
                    ))}
                  </Checkbox.Group>
                </div>
              </div>
            </div>
          </Col>
          <Col span={18} className="items">
            <Row>
              <Col span={24}>
                <Search
                  placeholder="Search by name"
                  style={{ width: 250, float: "right", paddingRight: "20px" }}
                />
              </Col>
            </Row>
            <List
              grid={{ gutter: 18, column: 4 }}
              dataSource={childrenProfiles}
              renderItem={(item) => (
                <List.Item>
                  <Link to={`${childrenDetailUrl}/${item.id}`} target="_blank">
                    <div className="item">
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
                          {!item.gender ? " Boy" : " Girl"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <div className="items"></div>
      </div>
    </>
  );
};

export default ChildrenList;
