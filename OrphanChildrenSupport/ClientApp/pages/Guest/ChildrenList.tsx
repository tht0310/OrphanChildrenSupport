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
} from "antd";
import Meta from "antd/lib/card/Meta";
import * as React from "react";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import Children from "@Images/child1.jpg";
import { displayDate, displayDateTime } from "@Services/FormatDateTimeService";
import { DatePicker, Space } from "antd";

import FallBackImage from "@Images/children-default.png";

const { RangePicker } = DatePicker;
type Props = RouteComponentProps<{}>;

const childrenProfileService = new ChildrenProfileService();
const childrenDetailUrl = "children/detail";

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

  async function fetchData() {
    fetchChildrenProfile();
  }

  async function fetchChildrenProfile() {
    const dataRes = await childrenProfileService.getAll();
    if (!dataRes.hasErrors) {
      setChildrenProfiles(dataRes.value.items);
    }
  }

  return (
    <div className="content-wrapper-custom">
      <Row>
        <Col span={5}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Children
              </li>
            </ol>
          </nav>
        </Col>
        <Col span={19}>
          <h3>Children Information</h3>
        </Col>
      </Row>

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
                <div className="header-item">Status</div>
                <Select
                  defaultValue={"All"}
                  showArrow
                  style={{ margin: "5%", width: "90%" }}
                >
                  <Select.Option value="Donation">Donation</Select.Option>
                  <Select.Option value="Support">Support</Select.Option>
                  <Select.Option value="All">All</Select.Option>
                </Select>
              </div>
            </div>
          </div>
        </Col>
        <Col span={18} className="items">
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
                      <p className="descroption">{displayDate(item.dob)}</p>
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
  );
};

export default ChildrenList;
