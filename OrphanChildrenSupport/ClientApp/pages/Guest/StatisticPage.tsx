import { BarChartOutlined } from "@ant-design/icons";
import DonutPieChart from "@Components/shared/DonutPieChart";
import { Card, Col, Divider, Row, Space, Tabs, Tag } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import ChildrenSection from "./StatisticSection/ChildrenSection";

type Props = RouteComponentProps<{}>;

const StatisticPage: React.FC<Props> = () => {
  return (
    <div className="table-container">
      <Row gutter={16} style={{ margin: "10px 0px 20px 0px" }}>
        <Col
          className="gutter-row"
          xs={12}
          span={6}
          lg={6}
          style={{ marginBottom: "10px" }}
        >
          <Card>
            <h6 style={{ marginBottom: "0", fontSize: "12", color: "#505050" }}>
              Total children
            </h6>
            <div style={{ fontSize: "25", fontWeight: "bold" }}>
              <Row>
                <Col span={8}>
                  <BarChartOutlined
                    style={{
                      color: "#2eb85c",
                      marginTop: "10px",
                      fontSize: "23",
                    }}
                  />
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <Tag color={"green"} style={{ marginTop: "10px" }}>
                    8
                  </Tag>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col className="gutter-row" xs={12} span={6} lg={6}>
          <Card>
            <h6 style={{ marginBottom: "0", fontSize: "12", color: "#505050" }}>
              Total children
            </h6>
            <div style={{ fontSize: "25", fontWeight: "bold" }}>
              <Row>
                <Col span={8}>
                  <BarChartOutlined
                    style={{
                      color: "#f9b115",
                      marginTop: "10px",
                      fontSize: "23",
                    }}
                  />
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <Tag color={"gold"} style={{ marginTop: "10px" }}>
                    8
                  </Tag>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col className="gutter-row" xs={12} span={6} lg={6}>
          <Card>
            <h6 style={{ marginBottom: "0", fontSize: "12", color: "#505050" }}>
              Total children
            </h6>
            <div style={{ fontSize: "25", fontWeight: "bold" }}>
              <Row>
                <Col span={8}>
                  <BarChartOutlined
                    style={{
                      color: "#3399ff",
                      marginTop: "10px",
                      fontSize: "23",
                    }}
                  />
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <Tag color={"blue"} style={{ marginTop: "10px" }}>
                    8
                  </Tag>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col className="gutter-row" xs={12} span={6} lg={6}>
          <Card>
            <h6 style={{ marginBottom: "0", fontSize: "12", color: "#505050" }}>
              Total children
            </h6>
            <div style={{ fontSize: "25", fontWeight: "bold" }}>
              <Row>
                <Col span={8}>
                  <BarChartOutlined
                    style={{
                      color: "#e55353",
                      marginTop: "10px",
                      fontSize: "23",
                    }}
                  />
                </Col>
                <Col span={16} style={{ textAlign: "right" }}>
                  <Tag color={"red"} style={{ marginTop: "10px" }}>
                    8
                  </Tag>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col
          span={16}
          xs={24}
          lg={16}
          style={{ marginBottom: "15px", padding: "0px 5px" }}
        >
          <Card>
            <ChildrenSection
              history={undefined}
              location={undefined}
              match={undefined}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8} span={8} style={{ padding: "0px 5px" }}>
          <Card>
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#606060",
                fontSize: "13px",
                marginBottom: "20px",
              }}
            >
              Top 6 most users donated
            </div>
            <Row>
              <Col span={24}>Nguyen Van A</Col>
              <Col
                span={24}
                style={{ color: "rgba(0,0,0,.45)", fontSize: "12px" }}
              >
                anguyen@gmail.com - Donation times: 8
              </Col>
            </Row>
            <Divider style={{ margin: "10px 0" }} />
            <Row>
              <Col span={24}>Nguyen Van A</Col>
              <Col
                span={24}
                style={{ color: "rgba(0,0,0,.45)", fontSize: "12px" }}
              >
                anguyen@gmail.com - Donation times: 8
              </Col>
            </Row>
            <Divider style={{ margin: "10px 0" }} />
            <Row>
              <Col span={24}>Nguyen Van A</Col>
              <Col
                span={24}
                style={{ color: "rgba(0,0,0,.45)", fontSize: "12px" }}
              >
                anguyen@gmail.com - Donation times: 8
              </Col>
            </Row>
            <Divider style={{ margin: "10px 0" }} />
            <Row>
              <Col span={24}>Nguyen Van A</Col>
              <Col
                span={24}
                style={{ color: "rgba(0,0,0,.45)", fontSize: "12px" }}
              >
                anguyen@gmail.com - Donation times: 8
              </Col>
            </Row>
            <Divider style={{ margin: "10px 0" }} />
            <Row>
              <Col span={24}>Nguyen Van A</Col>
              <Col
                span={24}
                style={{ color: "rgba(0,0,0,.45)", fontSize: "12px" }}
              >
                anguyen@gmail.com - Donation times: 8
              </Col>
            </Row>
            <Divider style={{ margin: "10px 0" }} />
            <Row>
              <Col span={24}>Nguyen Van A</Col>
              <Col
                span={24}
                style={{ color: "rgba(0,0,0,.45)", fontSize: "12px" }}
              >
                anguyen@gmail.com - Donation times: 8
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12} xs={24} lg={12} style={{ padding: "10px 5px" }}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              Donation
            </div>

            <DonutPieChart
              history={undefined}
              location={undefined}
              match={undefined}
            />
          </Card>
        </Col>
        <Col span={12} xs={24} lg={12} style={{ padding: "10px 5px" }}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              Report
            </div>

            <DonutPieChart
              history={undefined}
              location={undefined}
              match={undefined}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticPage;
