import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import ChildrenProfileService, {
  ChildrenParams,
} from "@Services/ChildrenProfileService";
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
  Card,
  Radio,
  Button,
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
import { FilterParams } from "@Models/IFilterType";
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
type Props = RouteComponentProps<{}>;

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "/children";
const supportCategoriesService = new SupportCategoryService();

const ChildrenSupportedPage: React.FC<Props> = () => {
  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    document.title = "Children - Supported | FOR THE CHILDREN";
    fetchData();
  }, []);
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);

  React.useEffect(() => {
    fetchSupportCategories();
    fetchData();
  }, []);

  async function fetchData() {
    fetchChildrenProfile({ childrenProfileStatus: 1 });
  }

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  async function fetchChildrenProfile(filterParams) {
    setIsLoading(true);
    const dataRes = await childrenProfileService.getAll(filterParams);
    if (!dataRes.hasErrors) {
      const tempValue = dataRes.value.items;
      for (let index = 0; index < tempValue.length; index++) {
        if (tempValue[index].status === 1) {
          let tempId = await getImage(tempValue[index].id);
          tempValue[index].imageId = tempId;
        }
      }

      setChildrenProfiles(tempValue);
    }
    setIsLoading(false);
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

  function convertAddressToString(address: string) {
    const tempAddress = address.split("-");
    let result = "";
    tempAddress.reverse();
    tempAddress.map((v) => {
      result += v + " ";
    });

    return result;
  }

  async function onResetField() {
    setIsLoading(true);
    const searchValue: ChildrenParams = {};
    searchValue.childrenProfileStatus = 1;

    const res = await childrenProfileService.search(searchValue);
    const tempValue = res.value.items;
    for (let index = 0; index < tempValue.length; index++) {
      let tempId = await getImage(tempValue[index].id);
      tempValue[index].imageId = tempId;
    }
    setChildrenProfiles(tempValue);
    setIsLoading(false);
  }

  async function onSearch(value) {
    setIsLoading(true);
    const searchValue: ChildrenParams = {};
    searchValue.childrenProfileStatus = 1;

    if (value.fullName !== undefined) {
      searchValue.fullName = value.fullName;
    }
    if (value.gender !== undefined) {
      searchValue.gender = value.gender;
    }

    if (value.age !== undefined) {
      searchValue.fromAge = value.age[0];
      searchValue.toAge = value.age[1];
    }
    const res = await childrenProfileService.search(searchValue);
    const tempValue = res.value.items;
    for (let index = 0; index < tempValue.length; index++) {
      let tempId = await getImage(tempValue[index].id);
      tempValue[index].imageId = tempId;
    }

    let resData = tempValue;
    let temp = [];
    if (value.supportCategories !== undefined) {
      if (value.supportCategories.length > 0) {
        resData.map((v) => {
          const result = v.childrenProfileSupportCategories.filter((o) =>
            value.supportCategories.some((m) => o.supportCategoryId == m)
          );

          if (result.length > 0) {
            temp.push(v);
          }
        });
        setChildrenProfiles(temp);
        setIsLoading(false);
        return;
      }
    }
    setChildrenProfiles(temp.length > 0 ? temp : resData);
    setIsLoading(false);
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
            <Col
              span={24}
              lg={24}
              xs={24}
              className="title-page"
              style={{
                textAlign: "center",
                padding: "15px 0px",
                fontSize: "22px",
                fontWeight: 600,
                color: "#484848",
              }}
            >
              Children - Supported
            </Col>
          </Row>

          <Row>
            <Col
              span={6}
              lg={6}
              xs={0}
              style={{ marginTop: "30px", paddingRight: "50px" }}
              className="search-container"
            >
              <Form form={form} onFinish={onSearch}>
                <div>
                  <Form.Item name={"fullName"}>
                    <Input
                      placeholder="Seach by name"
                      prefix={
                        <SearchOutlined className="site-form-item-icon" />
                      }
                    />
                  </Form.Item>
                </div>
                <div className="card-container">
                  <Card
                    bodyStyle={{ padding: 0 }}
                    bordered={false}
                    title="GENDER"
                  >
                    <Form.Item name={"gender"}>
                      <Radio.Group style={{ width: "100%" }}>
                        <Radio.Button
                          style={{ width: "34%" }}
                          value={undefined}
                        >
                          All
                        </Radio.Button>
                        <Radio.Button style={{ width: "33%" }} value={true}>
                          Boy
                        </Radio.Button>
                        <Radio.Button style={{ width: "33%" }} value={false}>
                          Girl
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Card>
                </div>
                <div className="card-container">
                  <Card bodyStyle={{ padding: "10px" }} title="AGE">
                    <Form.Item name={"age"}>
                      <Slider min={1} max={20} range />
                    </Form.Item>
                  </Card>
                </div>
                <div className="card-container">
                  <Card bodyStyle={{ padding: "10px" }} title="NEED SUPPORT">
                    <Form.Item name="supportCategories">
                      <Checkbox.Group
                        name="childrenCategory"
                        style={{ width: "100%" }}
                        className="checkbox-container"
                      >
                        {supportCategories.map((a) => (
                          <Row>
                            <Checkbox value={a.id}>{a.title}</Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>
                  </Card>
                </div>
                <Row className="card-container" gutter={16}>
                  <Col span={12}>
                    <Button
                      type="primary"
                      onClick={form.submit}
                      style={{ width: "100%" }}
                    >
                      Search
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      onClick={() => {
                        form.resetFields(), onResetField();
                      }}
                      ghost
                      type="primary"
                      style={{ width: "100%" }}
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
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
                loading={isLoading ? true : false}
                dataSource={childrenProfiles}
                pagination={{
                  defaultPageSize: 12,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "15", "20", "25"],
                }}
                renderItem={(item) => (
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
                            {item.age + " years old"} |
                            {item.gender ? " Boy" : " Girl"}
                          </p>
                          <p className="descroption">{item.publicAddress}</p>
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

export default ChildrenSupportedPage;
