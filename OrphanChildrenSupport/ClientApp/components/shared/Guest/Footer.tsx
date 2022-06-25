import {
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Logo from "@Images/logo.png";

// routes config
interface Props {}

const Footer: FC<Props> = () => {
  return (
    <div className="footer-custom">
      <div className="container-fluid">
        <Row>
          <Col span={10} lg={10} xs={0}>
            <div className="title">Stay connected</div>
            {/* <img src={Logo} alt="" className="logo" /> */}
            {/* <div className="content">
              Join us to receive weekly information about children.
            </div> */}
            {/* <Row>
              <Col span={14}>
                <Input placeholder="Enter email" />
              </Col>
              <Col span={10}>
                <Button style={{ zIndex: 0 }}>Submit</Button>
              </Col>
            </Row> */}
            <div className="icons">
              <Space size={15}>
                <FacebookOutlined style={{ fontSize: "30px" }} />

                <MailOutlined style={{ fontSize: "30px" }} />

                <YoutubeOutlined style={{ fontSize: "30px" }} />

                <InstagramOutlined style={{ fontSize: "30px" }} />
              </Space>
            </div>
          </Col>
          <Col span={10} lg={10} xs={24} className="middle-col">
            <div className="title">INFORMATION</div>
            <div className="content">
              <Link to="/aboutUs" style={{ color: "white" }}>
                About Us
              </Link>
            </div>
            <div className="content">
              <Link to="/contactUs" style={{ color: "white" }}>
                Contact Us
              </Link>
            </div>
            <div className="content">Terms And Conditions</div>
          </Col>
          <Col className="last-col" span={4} lg={4} xs={24}>
            <div className="title">GET HELP </div>
            <div className="content">FAQ</div>
            <div className="content">Help Center</div>
            <div className="content">Privacy Policy</div>
          </Col>
        </Row>
        <hr />
        <div className="detail">
          For The Children - <EnvironmentOutlined /> Nam Ky Khoi Nghia - Hoa Phu
          - Thu Dau Mot - Binh Duong - <WhatsAppOutlined /> 0123456789
        </div>
        <Row className="content">
          <Col span={24} lg={24} xs={24} style={{ textAlign: "center" }}>
            Copyright © 2022 For The Children
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
