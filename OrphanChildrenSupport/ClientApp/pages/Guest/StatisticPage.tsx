import { Card, Col, Row, Tabs } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import ChildrenSection from "./StatisticSection/ChildrenSection";

type Props = RouteComponentProps<{}>;

const StatisticPage: React.FC<Props> = () => {
  return (
    <div className="table-container">
      <Row gutter={16} style={{ margin: "10px 0px 40px 0px" }}>
        <Col className="gutter-row" span={6}>
          <div>
            <Card style={{ textAlign: "center" }}>
              <h6 style={{ marginBottom: "0" }}>Total</h6>
              <div style={{ fontSize: "32", fontWeight: "bold" }}>8</div>
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card style={{ textAlign: "center" }}>
            <h6 style={{ marginBottom: "0" }}>Total children</h6>
            <div style={{ fontSize: "32", fontWeight: "bold" }}>8</div>
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card style={{ textAlign: "center" }}>
            <h6 style={{ marginBottom: "0" }}>Total children</h6>
            <div style={{ fontSize: "32", fontWeight: "bold" }}>8</div>
          </Card>
        </Col>
        <Col className="gutter-row" span={6}>
          <Card style={{ textAlign: "center" }}>
            <h6 style={{ marginBottom: "0" }}>Total children</h6>
            <div style={{ fontSize: "32", fontWeight: "bold" }}>8</div>
          </Card>
        </Col>
      </Row>
      <ChildrenSection
        history={undefined}
        location={undefined}
        match={undefined}
      />
    </div>
  );
};

export default StatisticPage;
