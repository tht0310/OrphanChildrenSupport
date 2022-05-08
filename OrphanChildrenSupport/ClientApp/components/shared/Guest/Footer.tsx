import {
  EnvironmentOutlined,
  FacebookOutlined,
  HomeOutlined,
  InstagramOutlined,
  MailOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { CContainer } from "@coreui/react";
import { Button, Col, Input, Row } from "antd";
import React, { FC } from "react";

// routes config
interface Props {}

const Footer: FC<Props> = () => {
  return (
    <div className="footer-custom">
      <div className="container-fluid">
        <Row>
          <Col span={10}>
            <div className="title">Stay connected</div>
            <div className="content">
              Join us to receive weekly information about children.
            </div>
            <Row>
              <Col span={14}>
                <Input placeholder="Enter email" />
              </Col>
              <Col span={10}>
                <Button>Submit</Button>
              </Col>
            </Row>
            <div className="icons">
              <Row>
                <Col span={4}>
                  <FacebookOutlined style={{ fontSize: "30px" }} />
                </Col>
                <Col span={4}>
                  <MailOutlined style={{ fontSize: "30px" }} />
                </Col>
                <Col span={4}>
                  <YoutubeOutlined style={{ fontSize: "30px" }} />
                </Col>
                <Col span={4}>
                  <InstagramOutlined style={{ fontSize: "30px" }} />
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={10} className="middle-col">
            <div className="title">INFORMATION</div>
            <div className="content">About For the Children</div>
            <div className="content">Contact us</div>
            <div className="content">Our team</div>
            <div className="content">Report information</div>
          </Col>
          <Col span={4}>
            <div className="title">GET HELP </div>
            <div className="content">Help center</div>
            <div className="content">Privacy Policy</div>
          </Col>
        </Row>
        <hr />
        <div className="detail">
          For the Children - <EnvironmentOutlined /> Nam Ky Khoi Nghia, Đinh
          Hoa, Thu Dau Mot, Binh Duong - <WhatsAppOutlined /> 0123456789
        </div>
        <hr />
        <Row className="policy">
          <Col span={12}>© 2020 For the Children</Col>
          <Col span={6}>Term</Col>
          <Col span={6}>Policy</Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
