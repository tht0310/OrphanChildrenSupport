import React from "react";

import WidgetsDropdown from "@Components/shared/WidgetsDropdown";
import DonutPieChart from "@Components/shared/DonutPieChart";
import { Card, Col, Divider, Row, Space } from "antd";
import ChildrenSection from "@Components/shared/Section/ChildrenSection";
import StatisticService from "@Services/StatisticService";
import {
  IDonationStatisticModel,
  IDonationTimesModel,
  IReportStatisticModel,
  ITopDonationUserModel,
} from "@Models/IStatisticModel";

const statisticService = new StatisticService();
const Dashboard = () => {
  const [donations, setDonations] = React.useState<IDonationStatisticModel[]>(
    []
  );
  const [reports, setReports] = React.useState<IReportStatisticModel[]>([]);
  const [topUser, setTopUsers] = React.useState<ITopDonationUserModel[]>([]);
  const [donationTime, setDonationTimes] = React.useState<
    IDonationTimesModel[]
  >([]);

  React.useEffect(() => {
    fetchDonation();
    fetchReport();
    fetchDonationTimes();
    fetchTopUser();
  }, []);

  async function fetchDonation() {
    const res = await statisticService.getStatisticDonation();
    if (!res.hasErrors) {
      setDonations(res.value);
    }
  }

  async function fetchReport() {
    const res = await statisticService.getStatisticReport();

    if (!res.hasErrors) {
      setReports(res.value);
    }
  }

  async function fetchTopUser() {
    const res = await statisticService.getTopDonations(6);
    if (!res.hasErrors) {
      setTopUsers(res.value);
    }
  }

  async function fetchDonationTimes() {
    const res = await statisticService.getDonationsTime(2022);
    if (!res.hasErrors) {
      setDonationTimes(res.value);
    }
  }

  return (
    <div className="table-container dashbaord-page">
      <WidgetsDropdown />
      <Row>
        <Col
          span={16}
          xs={24}
          lg={16}
          style={{ marginBottom: "15px", padding: "0px 5px" }}
        >
          <Card className="chart">
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#606060",
                fontSize: "16px",
                marginBottom: "15px",
              }}
            >
              Supported Children
            </div>

            <ChildrenSection data={donationTime} />
          </Card>
        </Col>
        <Col xs={24} lg={8} span={8} style={{ padding: "0px 5px 15px 5px" }}>
          <Card style={{ height: "100%" }}>
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#606060",
                fontSize: "16px",
                margin: "0px 0px 15px 0px",
              }}
            >
              Top Donation
            </div>

            {topUser?.map((v, index) => {
              return (
                <>
                  <div>
                    <div>{v.fullName}</div>
                    <div style={{ color: "rgba(0,0,0,.45)", fontSize: "12px" }}>
                      <Row>
                        <Col span={18}>{v.email}</Col>
                        <Col span={6} style={{ textAlign: "right" }}>
                          Times: {v.value}
                        </Col>
                      </Row>
                    </div>
                  </div>
                  {index !== topUser.length - 1 && (
                    <Divider style={{ margin: "10px 0" }} />
                  )}
                </>
              );
            })}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12} xs={24} lg={12} style={{ padding: "10px 5px" }}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              Donation
            </div>

            <DonutPieChart data={donations} />
          </Card>
        </Col>
        <Col span={12} xs={24} lg={12} style={{ padding: "10px 5px" }}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              Report
            </div>

            <DonutPieChart data={reports} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
