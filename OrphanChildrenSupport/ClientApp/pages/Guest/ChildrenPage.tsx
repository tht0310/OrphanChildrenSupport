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
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
type Props = RouteComponentProps<{}>;

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children/detail";
const supportCategoriesService = new SupportCategoryService();

const ChildrenPage: React.FC<Props> = (props) => {
  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);

  const [form] = Form.useForm();
  const [keyword, setKeyWord] = React.useState<String>("");
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

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get("keyword");
    fetchChildrenProfile({ fullName: keyword });
  }, [props.location]);

  async function fetchData() {
    fetchChildrenProfile({ childrenProfileStatus: null });
  }

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  async function fetchChildrenProfile(filterParam) {
    const dataRes = await childrenProfileService.getAll(filterParam);

    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
    }
  }

  async function onSearchGender(value) {
    fetchChildrenProfile({ gender: value });
  }

  async function onSearchFullName(value) {
    fetchChildrenProfile({ fullName: value });
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
      <Form form={form} name="filter-form" autoComplete="off">
        <div className="content-wrapper-custom">
          <Row>
            <Col
              span={12}
              style={{
                paddingLeft: "40px",
                fontSize: "18px",
              }}
              className="title-page"
            >
              <div id={"title"}>All children</div>
            </Col>
            <Col span={12}>
              <Input
                placeholder="Seach by name"
                style={{ width: "40%", float: "right", paddingRight: "10px" }}
                prefix={<SearchOutlined className="site-form-item-icon" />}
                onChange={(e) => {
                  onSearchFullName(e.target.value);
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <div className="wrap">
                <div className="menu">
                  <div className="mini-menu">
                    <ul>
                      <li className="sub">
                        <div
                          className="header-item"
                          style={{ background: "#f0f0f0", fontSize: "14p" }}
                          onClick={() => onSearchGender(null)}
                        >
                          All
                        </div>
                      </li>
                      <li className="sub">
                        <a
                          href="javascript:void(0)"
                          onClick={() => onSearchGender(true)}
                        >
                          Boys
                        </a>
                      </li>
                      <li className="sub">
                        <a
                          href="javascript:void(0)"
                          onClick={() => onSearchGender(false)}
                        >
                          Girls
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="menu-colors menu-item"
                    style={{ marginTop: "25px" }}
                  >
                    <div className="header-item">Age</div>
                    <Slider
                      range
                      defaultValue={[0, 100]}
                      onChange={(e) => onSearchAge(e)}
                    />
                  </div>
                  <div
                    className="menu-size menu-item"
                    style={{ marginTop: "25px" }}
                  >
                    <div className="header-item ">Filter By</div>
                    <Checkbox.Group
                      name="childrenCategory"
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
              <List
                grid={{ gutter: 18, column: 4 }}
                dataSource={childrenProfiles}
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "50"],
                }}
                renderItem={(item) => (
                  <List.Item>
                    <Link
                      to={`${childrenDetailUrl}/${item.id}`}
                      target="_blank"
                    >
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
                            {item.gender ? " Boy" : " Girl"}
                          </p>
                          <p className="descroption">
                            {convertAddressToString(item.publicAddress)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default ChildrenPage;
