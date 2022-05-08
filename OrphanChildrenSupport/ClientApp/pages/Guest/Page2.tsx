import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import QueueAnim from "rc-queue-anim";
import ScrollOverPack from "rc-scroll-anim/lib/ScrollOverPack";
import Children from "@Images/children3.jpg";
import Child1 from "@Images/child1.png";
import Child11 from "@Images/child1-2.jpg";
import Child2 from "@Images/child2.png";
import Child22 from "@Images/child2-2.jpg";
import Child3 from "@Images/child3.png";
import Child32 from "@Images/child3-3.jpg";
import Child4 from "@Images/child4.png";
import Child42 from "@Images/child-4.2.jpg";
import FoodDonation from "@Images/food-donation.png";
import Money from "@Images/salary.png";
import { MoneyCollectOutlined, PayCircleOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";

export default function Page2() {
  const [picOver1, setpicOver1] = useState(false);
  const [picOver2, setpicOver2] = useState(false);
  const [picOver3, setpicOver3] = useState(false);
  const [picOver4, setpicOver4] = useState(false);
  const [content1, setContent1] = useState(false);
  const [content2, setContent2] = useState(false);
  const [content3, setContent3] = useState(false);
  const [content4, setContent4] = useState(false);

  return (
    <div className="response-container">
      <div className="page">
        <h3 className="topic-name">Our response</h3>
        <div className="response-page">
          <Row>
            <Col
              span={6}
              onMouseOver={() => {
                setpicOver1(true), setContent1(true);
              }}
              onMouseOut={() => {
                setpicOver1(false), setContent1(false);
              }}
              className="col-container"
            >
              <Row>
                <div className="block">
                  <img
                    src={!picOver1 ? Child11 : Child1}
                    alt="arrow"
                    className="sec-pic"
                  />
                </div>
              </Row>
              <Row className="block-content">
                <Col span={24}>
                  <div>
                    <div className="title">Safety</div>
                    {content1 && (
                      <div className="content">
                        ‍Every child deserves to feel safe, and live a life free
                        of neglect, abuse, and violence.
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col
              span={6}
              onMouseOver={() => {
                setpicOver2(true), setContent2(true);
              }}
              onMouseOut={() => {
                setpicOver2(false), setContent2(false);
              }}
              className="col-container"
            >
              <Row className="block-content">
                <Col span={24}>
                  <div>
                    <div className="title">Family</div>
                    {content2 && (
                      <div className="content">
                        ‍Every child deserves to live in a family that provides
                        basic stability, care, and love.
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="block">
                  <img
                    src={!picOver2 ? Child22 : Child2}
                    alt="arrow"
                    className="sec-pic"
                  />
                </div>
              </Row>
            </Col>
            <Col
              span={6}
              onMouseOver={() => {
                setpicOver3(true), setContent3(true);
              }}
              onMouseOut={() => {
                setpicOver3(false), setContent3(false);
              }}
              className="col-container"
            >
              <Row>
                <div className="block">
                  <img
                    src={!picOver3 ? Child32 : Child3}
                    alt="arrow"
                    className="sec-pic"
                  />
                </div>
              </Row>
              <Row className="block-content">
                <Col span={24}>
                  <div>
                    <div className="title">Rights</div>
                    {content3 && (
                      <div className="content">
                        ‍Every child deserves dignity. They must be allowed to
                        play, learn, develop, and flourish.
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col
              span={6}
              onMouseOver={() => {
                setpicOver4(true), setContent4(true);
              }}
              onMouseOut={() => {
                setpicOver4(false), setContent4(false);
              }}
              className="col-container"
            >
              <Row className="block-content">
                <Col span={24}>
                  <div>
                    <div className="title">Future</div>
                    {content4 && (
                      <div className="content">
                        ‍Every child deserves a life free from oppression, and
                        full of opportunity to shape a desired future.
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="block">
                  <img
                    src={!picOver4 ? Child42 : Child4}
                    alt="arrow"
                    className="sec-pic"
                  />
                </div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
