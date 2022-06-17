import React from "react";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import { Row, Col } from "antd";
const assets =
  "https://assets-global.website-files.com/601dab9820f304a9820dae49";

const data = [
  {
    image: `${assets}/620ee405ff3c707b4051def4_FTC-founded-icon.png`,
    title: "Founded",
    number: "2022",
  },
  {
    image: `${assets}/620ee405ff3c70db6951def8_FTC-volunteer-icon.png`,
    title: "Volunteers",
    number: "100+",
  },
  {
    image: `${assets}/620ee405ff3c7076f251defc_FTC-church-icon.png`,
    title: "Partners",
    number: "100+",
  },
  {
    image: `${assets}/620ee405ff3c707d6c51df00_FTC-children-icon.png`,
    title: "Children",
    number: "1000+",
  },
  {
    image: `${assets}/624106738c8f1ac9d185b642_FTC-RFK-icon.png`,
    title: "Chapters",
    number: "24",
  },
];
export default function Page1() {
  const children = data.map((d, i) => (
    <Col className="custom-col" key={i.toString()} md={4} sm={9} xs={24} lg={4}>
      <img width={220} src={d.image} alt="" />
      <div className="number">{d.number}</div>
      <div style={{ fontSize: "14px", paddingLeft: "10px" }}>{d.title}</div>
    </Col>
  ));
  return (
    <OverPack
      component="section"
      className="page-wrapper page5 text-center"
      style={{ minHeight: "350px", marginBottom: "20px" }}
    >
      <QueueAnim type="bottom" leaveReverse className="page" key="a">
        <h2
          key="h2"
          style={{
            color: "#88181b",
            fontWeight: "bold",
            marginBottom: "15px",
            marginTop: "30px",
          }}
        >
          Our Impact
        </h2>
        <div
          style={{
            borderBottom: "1px solid red",
            width: "30px",
            margin: "auto",
            marginBottom: "45px",
            height: "5px",
            background: "#88181b",
            borderRadius: "5px",
          }}
        ></div>
        <span className="separator" key="span" />
        <Row align="middle" className="page text-center" key="a">
          {children}
        </Row>
      </QueueAnim>
    </OverPack>
  );
}
