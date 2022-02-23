import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Card, Carousel, Col, Divider, Row } from "antd";
import React from "react";
import Children1 from "@Images/child1.jpg";
import { IPersonalProfileModel } from "@Models/IPersonalProfileModel";

interface Props {
  children: IPersonalProfileModel;
}

const style = { background: "#0092ff", padding: "8px 0" };

const Section: FC<Props> = ({ children }: Props) => {
  return (
    <div className="b">
      <Divider orientation="left">sub-element align full</Divider>
      <Row justify="space-around">
        <Col span={4}>
          <Card
            title=""
            bordered={false}
            style={{ width: 250 }}
            cover={<img alt="example" src={Children1} />}
            
          >
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={4}>
          <Card
            title=""
            style={{ width: 250 }}
            bordered={false}
            cover={<img alt="example" src={Children1} />}
          >
            <p>Card content</p>

          </Card>
        </Col>
        <Col span={4}>
          <Card
            title=""
            bordered={false}
            style={{ width: 250 }}
            cover={<img alt="example" src={Children1} />}
          >
            <p>Card content</p>

          </Card>
        </Col>
        <Col span={4}>
          <Card
            title=""
            bordered={false}
            style={{ width: 250 }}
            cover={<img alt="example" src={Children1} />}
          >
            <p>Card content</p>

          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Section;
