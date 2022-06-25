import React from "react";
import PropTypes from "prop-types";
import TweenOne from "rc-tween-one";
import ScrollOverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Button, Col, Row } from "antd";
import QueueAnim from "rc-queue-anim";
interface Props {}
const isMobile = false;
const Section5: React.FC<Props> = () => {
  return (
    <ScrollOverPack
      id="page3"
      className="content-wrapper page"
      style={{ marginTop: "100px" }}
    >
      <Row>
        <Col span={12} lg={12} xs={24}>
          <TweenOne
            key="image"
            className="image3 image-wrapper"
            animation={{ x: 0, opacity: 1, ease: "easeOutQuad" }}
            style={{ transform: "translateX(-100px)", opacity: 0 }}
          />
        </Col>
        <Col span={12} lg={12} xs={24} style={{ margin: "auto" }}>
          <QueueAnim
            className="text-wrapper"
            key="text"
            type={isMobile ? "bottom" : "right"}
            leaveReverse
          >
            <h2 key="h2" style={{ color: "#88181b", fontWeight: "bold" }}>
              WHO ARE WE?
            </h2>

            <p key="p" style={{ maxWidth: 550, paddingBottom: "20px" }}>
              We are volunteers to connect sponsors to orphan children. It's our
              desire for every child to experience unconditional love, hope and
              safety.
            </p>

            <p key="p" style={{ maxWidth: 550, paddingBottom: "20px" }}>
              We are unrelenting in our service for the betterment of the
              individual, families, and society. Our bold ambition is bringing
              communities, civil society, governments, and donors together to
              achieve lasting change for children.
            </p>
          </QueueAnim>
        </Col>
      </Row>
    </ScrollOverPack>
  );
};
export default Section5;
