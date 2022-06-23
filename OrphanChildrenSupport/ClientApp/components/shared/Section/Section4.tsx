import React, { useState } from "react";
import { Row, Col, Card } from "antd";
import QueueAnim from "rc-queue-anim";

import OverPack from "rc-scroll-anim/lib/ScrollOverPack";

export default function Section4() {
  return (
    <OverPack component="section" className="page-wrapper page3 container">
      <QueueAnim
        type="bottom"
        className="page text-center"
        leaveReverse
        key="page"
      >
        <h2
          style={{
            color: "#88181b",
            fontWeight: "bold",
            marginBottom: "15px",
            marginTop: "20px",
          }}
        >
          What we do ?
        </h2>
        <div
          style={{
            borderBottom: "1px solid red",
            width: "30px",
            margin: "auto",
            marginBottom: "25px",
            height: "5px",
            background: "#88181b",
            borderRadius: "5px",
          }}
        ></div>
        <span key="line" className="separator" />
        <QueueAnim type="bottom" className="info-content" key="content">
          <p className="main-info" style={{ fontSize: "16px" }} key="1">
            We are unrelenting in our service for the betterment of the
            individual, families, and society.
          </p>
          <p className="main-info" style={{ fontSize: "16px" }} key="2">
            Our bold ambition is bringing communities, civil society,
            governments, and donors together to achieve lasting change for
            children.
          </p>
        </QueueAnim>
      </QueueAnim>
    </OverPack>
  );
}
