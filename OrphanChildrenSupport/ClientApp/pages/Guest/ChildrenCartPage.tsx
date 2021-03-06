import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import {
  Card,
  Col,
  List,
  Row,
  Image,
  Carousel,
  Form,
  Input,
  Popconfirm,
  message,
} from "antd";
import * as React from "react";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { displayDate } from "@Services/FormatDateTimeService";
import { DatePicker } from "antd";
import FallBackImage from "@Images/children-default.png";
import { FilterParams } from "@Models/IFilterType";
import {
  DeleteOutlined,
  EyeOutlined,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FavoriteService from "@Services/FavoriteService";
import { IFavoriteModel } from "@Models/IFavoriteModel";
import { ILoginModel, IRegisterModel } from "@Models/ILoginModel";
import AccountService from "@Services/AccountService";
import ChildrenProfileService from "@Services/ChildrenProfileService";

const { RangePicker } = DatePicker;
type Props = RouteComponentProps<{}>;

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children";
const favoriteChildrenService = new FavoriteService();

const userService = new AccountService();

const ChildrenCartPage: React.FC<Props> = () => {
  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [localUser, setLocalUser] = React.useState<ILoginModel>(null);
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
  const [form] = Form.useForm();
  const [filterParams, setFilterParams] = React.useState<FilterParams>([]);

  const [favoriteChildren, setFavouriteChildren] = React.useState<
    IFavoriteModel[]
  >([]);
  const [favorites, setFavourites] = React.useState<IFavoriteModel[]>([]);
  useEffect(() => {
    document.title = "Favorite | FOR THE CHILDREN";

    fetchData();
  }, []);

  React.useEffect(() => {
    getLocalUser();
  }, []);
  React.useEffect(() => {
    if (localUser) {
      fetchUser(localUser.id);
    }
  }, [localUser]);

  React.useEffect(() => {
    if (currentUser) {
      fetchData();
      fetchFavourite();
    }
  }, [currentUser]);

  React.useEffect(() => {
    fetchChildrenFavourite();
  }, [favorites]);
  async function fetchUser(id) {
    const res = await userService.getAccount(id);
    if (!res.hasErrors) {
      setCurrentUser(res.value);
    }
  }

  function getLocalUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setLocalUser(JSON.parse(retrievedObject));
    }
  }

  React.useEffect(() => {
    if (childrenProfiles.length > 0 && favorites.length > 0) {
      fetchChildrenFavourite();
    }
  }, [childrenProfiles, favorites]);

  React.useEffect(() => {
    fetchChildrenProfile(filterParams);
  }, [filterParams]);

  async function fetchData() {
    fetchChildrenProfile({ childrenProfileStatus: 0 });
  }

  async function fetchFavourite() {
    const dataRes = await favoriteChildrenService.getAll({
      accountId: currentUser.id,
    });

    if (!dataRes.hasErrors) {
      setFavourites(dataRes.value.items);
    }
  }

  async function fetchChildrenFavourite() {
    const tempData = [];
    for (let index = 0; index < favorites.length; index++) {
      const findIndex = childrenProfiles.findIndex(
        (item) => favorites[index].childrenProfileId === item.id
      );
      const temp: IFavoriteModel = favorites[index];
      temp.childrenProfile = childrenProfiles[findIndex];
      temp.imageId = await getImage(temp.childrenProfileId);
      tempData.push(temp);
      console.log(tempData);
    }
    setFavouriteChildren(tempData);
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

  async function fetchChildrenProfile(filterParams?) {
    const dataRes = await childrenProfileService.getAll({});
    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
    }
  }

  async function onSearchFullName(value) {
    fetchChildrenProfile({ fullName: value, childrenProfileStatus: 0 });
  }

  async function onDelete(id) {
    const res = await favoriteChildrenService.delete(id);
    if (!res.hasErrors) {
      message.success("Remove sucessfully");

      fetchFavourite();
    }
  }

  return (
    <div className="favorite-page">
      <div className="vertical-center">
        <div>
          <HeartOutlined style={{ fontSize: "25px" }} />
          <p>My Favorite Children</p>
        </div>
      </div>

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
        className="content-wrapper-custom favorite-page"
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
          dataSource={favoriteChildren}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          renderItem={(item) => (
            <List.Item>
              <div className="item">
                <Card
                  actions={[
                    <Row className="actions">
                      <Col span={12}>
                        <Link
                          to={`${childrenDetailUrl}/${item.childrenProfileId}`}
                        >
                          <EyeOutlined />
                        </Link>
                      </Col>

                      <Col span={12}>
                        <Popconfirm
                          title="Are you sure???"
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
                >
                  <Image
                    preview={false}
                    className="img-item"
                    src={childrenProfileService.getImageUrl(item.imageId)}
                    fallback={FallBackImage}
                    alt={"img" + item.id}
                  />
                  <div className="info">
                    <h3>{item?.childrenProfile?.fullName}</h3>
                    <p className="descroption">
                      {item?.childrenProfile?.age} years old |{" "}
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
                        ? "Waiting For Support"
                        : "Supported"}
                    </p>
                  </div>
                </Card>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ChildrenCartPage;
