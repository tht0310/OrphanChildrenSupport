import { BarChartOutlined } from "@ant-design/icons";
import DonutPieChart from "@Components/shared/DonutPieChart";
import ChildrenSection from "@Components/shared/Section/ChildrenSection";
import WidgetsDropdown from "@Components/shared/WidgetsDropdown";
import { Card, Col, Divider, Row, Space, Tabs, Tag } from "antd";
import * as React from "react";
import { RouteComponentProps } from "react-router";

type Props = RouteComponentProps<{}>;

const StatisticPage: React.FC<Props> = () => {
  return (
    <div className="table-container">
      <WidgetsDropdown />

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
