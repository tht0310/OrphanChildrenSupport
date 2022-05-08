import { Col, Row, Image, Button } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { displayDate } from "@Services/FormatDateTimeService";
import FallBackImage from "@Images/children-default.png";
import SupportCategoryService from "@Services/SupportCategoryService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";

import {
  EnvironmentOutlined,
  GiftOutlined,
  HeartOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import ChildrenConfirmationModel from "@Components/modals/ChildrenConfirmationModel";
import { IRegisterModel } from "@Models/ILoginModel";
import ReporChildrenDrawer from "@Components/drawers/ReportChildrenDrawer";

type Props = RouteComponentProps<{ id: string }>;

const childrenService = new ChildrenProfileService();
const supportCategoriesService = new SupportCategoryService();

const ChildrenDetailPage: React.FC<Props> = ({ match, history }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [children, setChildren] = React.useState<IChildrenProfileModel>();
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  const [selected, setSelected] = React.useState<ISupportCategoryModel[]>([]);
  const [isChildrenModel, setIsChildrenModel] = React.useState<boolean>(false);
  const [isChildrenDrawer, setIsChildrenDrawer] =
    React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = React.useState<IRegisterModel>(null);
  React.useEffect(() => {
    document.title = "Children Detail";
    fetchSupportCategories();
    getCurrentUser();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [supportCategories]);

  function getCurrentUser() {
    var retrievedObject = localStorage.getItem("currentUser");
    if (retrievedObject) {
      setCurrentUser(JSON.parse(retrievedObject));
    }
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
    setIsChildrenModel(!isChildrenModel);
  }

  function toggleChildrenDrawer() {
    setIsChildrenDrawer(!isChildrenDrawer);
  }

  async function fetchChildren(childrenId: number) {
    const res = await childrenService.getChildren(Number(childrenId));
    if (!res.hasErrors) {
      setChildren(res.value);
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
              <div className="tab-pane active" id="pic-1">
                <Image
                  preview={false}
                  className="img-item"
                  src={
                    children?.id
                      ? childrenService.getImageUrl(children.id)
                      : null
                  }
                  style={{ width: "480px", height: "350px" }}
                />
              </div>
              <div className="tab-pane" id="pic-2">
                <Image
                  preview={false}
                  className="img-item"
                  src={
                    children?.id
                      ? childrenService.getImageUrl(children.id)
                      : null
                  }
                  fallback={FallBackImage}
                />
              </div>
              <div className="tab-pane" id="pic-3">
                <Image
                  preview={false}
                  className="img-item"
                  src={
                    children?.id
                      ? childrenService.getImageUrl(children.id)
                      : null
                  }
                  fallback={FallBackImage}
                />
              </div>
              <div className="tab-pane" id="pic-4">
                <Image
                  preview={false}
                  className="img-item"
                  src={
                    children?.id
                      ? childrenService.getImageUrl(children.id)
                      : null
                  }
                  fallback={FallBackImage}
                />
              </div>
              <div className="tab-pane" id="pic-5">
                <Image
                  preview={false}
                  className="img-item"
                  src={
                    children?.id
                      ? childrenService.getImageUrl(children.id)
                      : null
                  }
                  fallback={FallBackImage}
                />
              </div>
            </div>
            <ul className="preview-thumbnail nav nav-tabs">
              <li className="active">
                <a data-target="#pic-1" data-toggle="tab">
                  <Image
                    preview={false}
                    className="img-item"
                    src={
                      children?.id
                        ? childrenService.getImageUrl(children.id)
                        : null
                    }
                    fallback={FallBackImage}
                  />
                </a>
              </li>
              <li>
                <a data-target="#pic-2" data-toggle="tab">
                  <Image
                    preview={false}
                    className="img-item"
                    src={
                      children?.id
                        ? childrenService.getImageUrl(children.id)
                        : null
                    }
                    fallback={FallBackImage}
                  />
                </a>
              </li>
              <li>
                <a data-target="#pic-3" data-toggle="tab">
                  <Image
                    preview={false}
                    className="img-item"
                    src={
                      children?.id
                        ? childrenService.getImageUrl(children.id)
                        : null
                    }
                    fallback={FallBackImage}
                  />
                </a>
              </li>
              <li>
                <a data-target="#pic-4" data-toggle="tab">
                  <Image
                    preview={false}
                    className="img-item"
                    src={
                      children?.id
                        ? childrenService.getImageUrl(children.id)
                        : null
                    }
                    fallback={FallBackImage}
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="details col-md-6">
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
                    onClick={() => toggleChildrenModal()}
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
                  >
                    <HeartOutlined style={{ fontSize: "12px" }} />
                    Favorite this child
                  </Button>
                </Col>
                <Col span={10}>
                  <Button
                    onClick={toggleChildrenDrawer}
                    style={{
                      height: "105%",
                      background: "#FFF7E6",
                      color: "#E57905",
                      border: "1px solid #FFF7E6",
                    }}
                  >
                    {" "}
                    <WarningOutlined style={{ fontSize: "12px" }} />
                    Report information
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
            <div
              style={{
                color: "#E57905",
              }}
            >
              {children?.fullName}
            </div>
            <div>
              Gender: {children?.gender ? "boy" : "girl"}
              <div>Date of Birth: {displayDate(children?.dob)}</div>
            </div>
            <div>
              Address: {convertPublicAddressToString(children?.publicAddress)}
            </div>
            <div>Guardian name: {children?.guardianName}</div>
          </Col>
          <Col span={12}>
            <Row>
              <h5 style={{ fontSize: "16px", lineHeight: "20px" }}>
                Circumstance{" "}
              </h5>
            </Row>
            <div>{children?.circumstance}</div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Row>
              <h5 style={{ fontSize: "16px", lineHeight: "20px" }}>
                Other Children{" "}
              </h5>
            </Row>
          </Col>
        </Row>
        <ChildrenConfirmationModel
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
        />
      </div>
    </>
  );
};

export default ChildrenDetailPage;
