import { Button, Col, Image, Row } from "antd";
import * as React from "react";
import { Facebook, Mail, Phone } from "react-feather";
import { RouteComponentProps } from "react-router";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
import Child from "@Images/child-3.jpg";
import CIcon from "@coreui/icons-react";
import { cilBaby } from "@coreui/icons";
import Counter from "react-number-counter";
import { ArrowRightOutlined } from "@ant-design/icons";
interface Props {}

const InformationSection2: React.FC<Props> = () => {
  return (
    <div className="container-fluid info-section-2">
      <div>
        <Row gutter={[2, 2]}>
          <Col span={12}>
            <div className="content">
              <div className="sub-title">What we do ?</div>
              <div className="sub-content">
                Our bold ambition is bringing communities, civil society,
                governments, businesses and donors together to achieve lasting
                change for children.
              </div>
              <Button danger>View more</Button>
            </div>
          </Col>

          <Col span={12}>
            <img src={Child} alt="" className="first-img" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InformationSection2;
