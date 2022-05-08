import { Button, Col, Image, Row } from "antd";
import * as React from "react";
import { Facebook, Mail, Phone } from "react-feather";
import { RouteComponentProps } from "react-router";
import GoogleMapReact from "google-map-react";
import { Link } from "react-router-dom";
import Child1 from "@Images/child-1.jpg";
import Child2 from "@Images/child-2.jpg";
import CIcon from "@coreui/icons-react";
import { cilBaby } from "@coreui/icons";
import Counter from "react-number-counter";
import { ArrowRightOutlined } from "@ant-design/icons";
interface Props {}

const InformationSection: React.FC<Props> = () => {
  return (
    <div className="container-fluid info-section">
      <div>
        <Row>
          <Col span={6}>
            <img src={Child1} alt="" className="first-img" />
          </Col>
          <Col span={6}>
            <img src={Child2} alt="" />
          </Col>

          <Col span={12}>
            <div className="content">
              <div className="mini-title">Who we are ?</div>
              <div className="sub-content">
                <div>
                  We are volunteers to connect sponsors to orphan children.
                </div>
                Its our desire desire for every child to experience
                unconditional love, hope and safety.
              </div>
              <Button danger>View more</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InformationSection;
