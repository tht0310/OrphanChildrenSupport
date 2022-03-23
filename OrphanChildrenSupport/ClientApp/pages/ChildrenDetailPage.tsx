import { Col, Row, Image } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import Children from "@Images/child1.jpg";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { Item } from "rc-menu";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import FallBackImage from "@Images/children-default.png";
import SupportCategoryService from "@Services/SupportCategoryService";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";
type Props = RouteComponentProps<{ id: string }>;

const childrenService = new ChildrenProfileService();
const supportCategoriesService = new SupportCategoryService();

const ChildrenDetailPage: React.FC<Props> = ({ match, history }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [children, setChildren] = React.useState<IChildrenProfileModel>();
  const [supportCategories, setSupportCategories] = React.useState<
    ISupportCategoryModel[]
  >([]);
  React.useEffect(() => {
    document.title = "Children Detail";
    fetchSupportCategories();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [supportCategories]);

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

  async function fetchChildren(childrenId: number) {
    const res = await childrenService.getChildren(Number(childrenId));
    if (!res.hasErrors) {
      setChildren(res.value);
    }
  }

  async function fetchSupportCategories() {
    const dataRes = await supportCategoriesService.getAll();
    if (!dataRes.hasErrors) {
      setSupportCategories(dataRes.value.items);
    }
  }

  function searchSupprtNameById(id) {
    let result = "";
    supportCategories.map((v) => {
      v.id === id ? (result = v.title) : "";
    });
    return result;
  }

  function getSupport(support) {
    let result = "";
    support.map((v) => {
      result += searchSupprtNameById(v.supportCategoryId) + " ";
    });
    result = result.replace(" ", ", ");
    return result;
  }

  function convertAddressToString(address: string) {
    let result = "";
    if (address) {
      const tempAddress = address.split("-");

      tempAddress.reverse();
      tempAddress.map((v) => {
        result += v + " ";
      });
    }

    return result;
  }

  return (
    <>
      {/* <div className="container">
        <nav className="breadcrumb" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Children</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Detail
            </li>
          </ol>
        </nav>
        <div className="children-detail-page">
          <Row>
            <Col span={10}>
              <Image
                preview={false}
                className="img-item"
                src={
                  children?.id ? childrenService.getImageUrl(children.id) : null
                }
                fallback={FallBackImage}
              />
            </Col>
            <Col span={14}>
              <h4>{children?.fullName}</h4>

              <span className="card-text item-company">
                Birthday: {displayDate(children?.dob)}
              </span>
              <p className="card-text">
                Status -{" "}
                <span className="text-success">{children?.status}</span>
              </p>

              <p className="card-text">
                GPS, Always-On Retina display, 30% larger screen, Swimproof, ECG
                app, Electrical and optical heart sensors, Built-in compass,
                Elevation, Emergency SOS, Fall Detection, S5 SiP with up to 2x
                faster 64-bit dual-core processor, watchOS 6 with Activity
                trends, cycle tracking, hearing health innovations, and the App
                Store on your wrist
              </p>
              <ul className="product-features list-unstyled">
                <li>
                  <i data-feather="shopping-cart"></i>{" "}
                  <span>Address: {children?.address}</span>
                </li>
                <li>
                  <i data-feather="dollar-sign"></i>
                  <span>Phone: {children?.phoneNumber}</span>
                </li>
              </ul>

              <hr />
              <div className="d-flex flex-column flex-sm-row pt-1">
                <a
                  href="#"
                  className="btn btn-primary btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
                >
                  <i data-feather="shopping-cart" className="me-50"></i>
                  <span className="add-to-cart">Donate</span>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-secondary btn-wishlist me-0 me-sm-1 mb-1 mb-sm-0"
                >
                  <i data-feather="heart" className="me-50"></i>
                  <span>Support</span>
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div> */}
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
                  style={{ width: "500px", height: "400px" }}
                  fallback={FallBackImage}
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
              <li>
                <a data-target="#pic-5" data-toggle="tab">
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
            <h3 className="product-title">{children?.fullName}</h3>
            <div className="rating">
              <span className="review-no">
                <span className="sub-title">Birthday: </span>{" "}
                {displayDate(children?.dob)} |{" "}
                <span className="sub-title">Gender: </span>{" "}
                {children?.gender ? "Boy" : "Girl"}
                <div>
                  <span className="sub-title">Address:</span>{" "}
                  {convertAddressToString(children?.publicAddress)}
                </div>
              </span>
            </div>
            <p className="product-description">
              <span className="sub-title">Circumstance:</span>{" "}
              {children?.circumstance}
            </p>

            <div className="rating">
              <span className="sub-title">
                Need support:{" "}
                {children?.childrenProfileSupportCategories
                  ? getSupport(children.childrenProfileSupportCategories)
                  : ""}
              </span>
              <p>
                <span className="sub-title">Status: </span>{" "}
                {children?.status ? "Supported" : "Waiting for support"}{" "}
              </p>
            </div>

            <div className="action">
              {children?.status && (
                <button className="add-to-cart btn btn-default" type="button">
                  Donate
                </button>
              )}
              <button className="add-to-cart btn btn-primary" type="button">
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChildrenDetailPage;
