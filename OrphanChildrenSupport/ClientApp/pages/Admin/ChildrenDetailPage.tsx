import { Col, Row, Image, Button, Tabs, message } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { displayDate } from "@Services/FormatDateTimeService";
import FallBackImage from "@Images/children-default.png";
import SupportCategoryService from "@Services/SupportCategoryService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";

import {
  CalendarOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  HeartOutlined,
  HomeOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";

import { ILoginModel, IRegisterModel } from "@Models/ILoginModel";
import ReporChildrenDrawer from "@Components/drawers/ReportChildrenDrawer";
import TextEditor from "@Components/shared/TextEditor";
import ReportFieldService from "@Services/ReportFieldService";
import { IReportFieldModel } from "@Models/IReportFieldModel";

import { IFavoriteModel } from "@Models/IFavoriteModel";
import FavoriteService from "@Services/FavoriteService";
import AccountService from "@Services/AccountService";
import DonationConfirmationModal from "@Components/modals/User/DonationConfirmationModal";
import OtherChildrenBlock from "@Components/shared/Section/OtherChildrenBlock";

type Props = RouteComponentProps<{ id: string }>;

const childrenService = new ChildrenProfileService();
const supportCategoriesService = new SupportCategoryService();
const reportFieldService = new ReportFieldService();
const favouriteService = new FavoriteService();
const userService = new AccountService();

const ChildrenDetailPage: React.FC<Props> = ({ match, history }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [children, setChildren] = React.useState<IChildrenProfileModel>();
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const [reports, setReport] = React.useState<IReportFieldModel[]>([]);
  const [selected, setSelected] = React.useState<ISupportCategoryModel[]>([]);
  const [isChildrenModel, setIsChildrenModel] = React.useState<boolean>(false);
  const [isChildrenDrawer, setIsChildrenDrawer] =
    React.useState<boolean>(false);
  const [childrenProfiles, setChildrenProfiles] = React.useState<
    IChildrenProfileModel[]
  >([]);
  const [localUser, setLocalUser] = React.useState<ILoginModel>(null);
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
  const [imageData, setImageData] = React.useState<any[]>([]);
  React.useEffect(() => {
    document.title = "Children Detail";
    fetchSupportCategories();
    fetchReport();
    getLocalUser();
    fetchChildrenProfile();
  }, []);

  React.useEffect(() => {
    if (localUser) {
      fetchUser(localUser.id);
    }
  }, [localUser]);

  function getLocalUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setLocalUser(JSON.parse(retrievedObject));
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [supportCategories]);

  React.useEffect(() => {
    if (children) {
      getImage(children.id);
    }
  }, [children]);

  async function fetchChildrenProfile() {
    const dataRes = await childrenService.getAll({ pageSize: 6 });
    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
    }
  }
  function viewImg(id) {
    const imageRes = childrenService.getImageUrl(id);
    return imageRes.toString();
  }

  function isEnable(id: number) {
    const index = children?.childrenProfileSupportCategories.findIndex(
      (x) => x.supportCategoryId === id
    );
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }

  async function getImage(id: number) {
    const imageRes = await childrenService.getChildrenImage(id);
    const imageData = imageRes.value.items;
    let tempValue = [];
    imageData.map(async (m) => {
      tempValue.push(m.id);
    });
    setImageData(tempValue);
  }

  async function fetchData() {
    try {
      const childrenId = Number(match.params.id);
      if (childrenId) {
        setIsLoading(true);
        fetchChildren(childrenId);
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  }

  function toggleChildrenModal() {
    if (isChildrenModel) {
      setSelected([]);
      var list = document.getElementsByClassName("ant-btn");
      for (var i = 0; i < list.length; i++) {
        list[i].className = "ant-btn ant-btn-default";
      }
    }
    setIsChildrenModel(!isChildrenModel);
  }

  function toggleChildrenDrawer() {
    setIsChildrenDrawer(!isChildrenDrawer);
  }

  async function favoriteChildren() {
    const temp: IFavoriteModel = {
      childrenProfileId: children?.id,
      accountId: currentUser?.id,
    };
    const res = await favouriteService.add(temp);
    console.log(res);
    if (!res.hasErrors) {
      message.success("Add to favourites successfuly");
    } else {
      message.warning("You added this child to favourite list.");
    }
  }

  async function fetchReport() {
    const dataRes = await reportFieldService.getAll();
    if (!dataRes.hasErrors) {
      setReport(dataRes.value.items);
    }
  }

  async function fetchChildren(childrenId: number) {
    const res = await childrenService.getChildren(Number(childrenId));
    if (!res.hasErrors) {
      setChildren(res.value);
    }
  }

  async function fetchUser(id) {
    const res = await userService.getAccount(id);
    if (!res.hasErrors) {
      setCurrentUser(res.value);
    }
  }

  function findSupportCategoriesById(id) {
    const index = supportCategories.findIndex((x) => x.id === id);

    return supportCategories[index];
  }

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  function convertPublicAddressToString(address: string) {
    let tempAddress = [];
    let result = "";
    if (address) {
      tempAddress = address.split("-");
      tempAddress.reverse();
      tempAddress.map((v) => {
        result += v + " ";
      });
    }

    return result;
  }

  function handleOnClickButton(e) {
    const classname = e.currentTarget.className;
    if (classname.includes("active")) {
      e.currentTarget.className = "ant-btn ant-btn-default";

      const newSelected = selected.filter(function (item) {
        return item.id !== Number(e.currentTarget.name);
      });
      setSelected(newSelected);
    } else {
      e.currentTarget.className = "ant-btn ant-btn-default active";
      const newSelected = selected.concat(
        findSupportCategoriesById(Number(e.currentTarget.name))
      );
      setSelected(newSelected);
    }
  }

  function convertAddressToString(address: string) {
    let tempAddress = [];
    if (address) {
      tempAddress = address.split("-");

      tempAddress.reverse();
    }

    return tempAddress[1];
  }

  return (
    <>
      <div className="children-detail-container">
        <div className="wrapper row">
          <div className="preview col-md-6">
            <div className="preview-pic tab-content">
              <Tabs tabPosition={"bottom"}>
                {imageData.length > 0 &&
                  imageData.map((v, index) => (
                    <Tabs.TabPane
                      tab={
                        <Image preview={false} width={100} src={viewImg(v)} />
                      }
                      key={index}
                    >
                      <Image preview={false} width={"98%"} src={viewImg(v)} />
                    </Tabs.TabPane>
                  ))}
              </Tabs>
            </div>
          </div>
          <div className="details col-md-6" style={{ paddingLeft: "20px" }}>
            <div className="product-title">{children?.fullName}</div>
            <div className="rating">
              <EnvironmentOutlined
                style={{ fontSize: "12px", color: "#ff9f1a" }}
              />{" "}
              {convertAddressToString(children?.publicAddress)}
            </div>
            <div className="support">
              <div className="option-title">Support</div>
              <Row>
                {supportCategories.map((s) => {
                  return (
                    <Col span={7}>
                      <Button
                        disabled={isEnable(s.id) ? false : true}
                        onClick={(e) => {
                          handleOnClickButton(e);
                        }}
                        name={s.id + ""}
                      >
                        <GiftOutlined style={{ fontSize: "12px" }} /> {s.title}
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </div>

            <div className="actions">
              <Row>
                <Col span={21}>
                  <Button
                    style={{ height: "105%" }}
                    onClick={() =>
                      currentUser !== null
                        ? toggleChildrenModal()
                        : (window.location.href = "/login")
                    }
                    disabled={selected.length > 0 ? false : true}
                  >
                    {" "}
                    <GiftOutlined style={{ fontSize: "12px" }} />
                    Donate now
                  </Button>
                </Col>
              </Row>
              <Row className="action2">
                <Col span={10} style={{ marginRight: "4%" }}>
                  <Button
                    style={{
                      height: "105%",
                      background: "#FFF7E6",
                      color: "#E57905",
                      border: "1px solid #FFF7E6",
                    }}
                    onClick={() =>
                      currentUser !== null
                        ? favoriteChildren()
                        : (window.location.href = "/login")
                    }
                  >
                    <HeartOutlined style={{ fontSize: "12px" }} />
                    Favorite this child
                  </Button>
                </Col>
                <Col span={10}>
                  <Button
                    onClick={() =>
                      currentUser !== null
                        ? toggleChildrenDrawer()
                        : (window.location.href = "/login")
                    }
                    style={{
                      height: "105%",
                      background: "#FFF7E6",
                      color: "#E57905",
                      border: "1px solid #FFF7E6",
                    }}
                  >
                    {" "}
                    <WarningOutlined style={{ fontSize: "12px" }} />
                    Reports
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <Row className="detail">
          <Col span={12}>
            <Row>
              <h5 style={{ fontSize: "16px", lineHeight: "20px" }}>
                Information{" "}
              </h5>
            </Row>
            <div>
              <span
                style={{
                  color: "#E57905",
                }}
              >
                {children?.fullName}
              </span>
              <span style={{ margin: "0px 6px" }}>-</span>
              <span>{children?.gender ? "boy" : "girl"}</span>
            </div>

            <div>
              <div>
                <CalendarOutlined style={{ color: "#b2b2b2" }} />{" "}
                {displayDate(children?.dob)}
              </div>
            </div>
            <div>
              <HomeOutlined style={{ color: "#b2b2b2", marginRight: "5px" }} />
              {convertPublicAddressToString(children?.publicAddress)}
            </div>
            <div>
              <UserOutlined style={{ color: "#b2b2b2" }} />{" "}
              {children?.guardianName}
            </div>
          </Col>
          <Col span={12}>
            <Row>
              <h5 style={{ fontSize: "16px", lineHeight: "20px" }}>
                Circumstance{" "}
              </h5>
            </Row>
            <div className="text-editor-read-only">
              {children?.circumstance && (
                <TextEditor
                  readingMode={true}
                  editable={false}
                  value={children?.circumstance.toString()}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h5
              style={{
                fontSize: "16px",
                lineHeight: "20px",
                marginBottom: "20px",
                paddingLeft: "7px",
              }}
            >
              Other Children{" "}
            </h5>
            <OtherChildrenBlock
              children={childrenProfiles}
              id={Number(match.params.id)}
            />
          </Col>
        </Row>
        <DonationConfirmationModal
          currentUser={currentUser}
          visible={isChildrenModel}
          onCancel={toggleChildrenModal}
          selected={selected}
          children={children}
        />
        <ReporChildrenDrawer
          currentUser={currentUser}
          visible={isChildrenDrawer}
          onCancel={toggleChildrenDrawer}
          children={children}
          reportField={reports}
        />
      </div>
    </>
  );
};

export default ChildrenDetailPage;
