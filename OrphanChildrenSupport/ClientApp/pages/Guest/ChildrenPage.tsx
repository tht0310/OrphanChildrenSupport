import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import {
  Col,
  List,
  Row,
  Image,
  Checkbox,
  Carousel,
  Form,
  Input,
  Slider,
} from "antd";

import * as React from "react";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { displayDate } from "@Services/FormatDateTimeService";
import { DatePicker } from "antd";
import Children1 from "@Images/children-banner.jpg";
import FallBackImage from "@Images/children-default.png";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
import SupportCategoryService from "@Services/SupportCategoryService";
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
type Props = RouteComponentProps<{}>;

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children";
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
      const tempValue = dataRes.value.items;
      for (let index = 0; index < tempValue.length; index++) {
        let tempId = await getImage(tempValue[index].id);

        tempValue[index].imageId = tempId;
      }
      setChildrenProfiles(tempValue);
    }
  }

  function viewImg(id) {
    const imageRes = childrenProfileService.getImageUrl(id);
    return imageRes.toString();
  }

  async function getImage(id: number) {
    const imageRes = await childrenProfileService.getChildrenImage(id);
    const imageData = imageRes.value.items;

    if (imageData.length > 0) {
      return imageData[0].id;
    } else {
      return -1;
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
          <Row className="custom-row">
            <Col span={12} lg={12} xs={10} className="title-page">
              <div id={"title"}>All children</div>
            </Col>
            <Col span={12} lg={12} xs={14}>
              <Input
                className="custom-input"
                placeholder="Seach by name"
                style={{ float: "right", paddingRight: "10px" }}
                prefix={<SearchOutlined className="site-form-item-icon" />}
                onChange={(e) => {
                  onSearchFullName(e.target.value);
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col span={6} className="custom-col">
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
            <Col span={18} lg={18} xs={24} className="items">
              <List
                grid={{
                  gutter: 16,
                  xs: 2,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
                  xxl: 4,
                }}
                dataSource={childrenProfiles}
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20", "50"],
                }}
                renderItem={(item) => {
                  return (
                    <List.Item>
                      <Link to={`${childrenDetailUrl}/${item.id}`}>
                        <div className="item">
                          <Image
                            preview={false}
                            className="img-item"
                            src={viewImg(item.imageId)}
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
                  );
                }}
              />
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default ChildrenPage;
