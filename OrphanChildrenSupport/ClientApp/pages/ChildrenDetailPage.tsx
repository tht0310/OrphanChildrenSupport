import { Col, Row, Image } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import Children from "@Images/child1.jpg";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { Item } from "rc-menu";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import FallBackImage from "@Images/children-default.png";
type Props = RouteComponentProps<{ id: string }>;
const childrenService = new ChildrenProfileService();

const ChildrenDetailPage: React.FC<Props> = ({ match, history }: Props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [children, setChildren] = React.useState<IChildrenProfileModel>();

  React.useEffect(() => {
    document.title = "Children Detail";
    fetchData();
  }, []);

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

  return (
    <>
      <div className="container">
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
      </div>
    </>
  );
};

export default ChildrenDetailPage;
