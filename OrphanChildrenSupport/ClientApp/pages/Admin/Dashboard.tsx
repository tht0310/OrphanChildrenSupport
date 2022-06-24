import React from "react";

import WidgetsDropdown from "@Components/shared/WidgetsDropdown";
import DonutPieChart from "@Components/shared/DonutPieChart";
import { Card, Col, Divider, Row } from "antd";
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
      setDonations(res.value.items);
    }
  }

  async function fetchReport() {
    const res = await statisticService.getStatisticReport();
    if (!res.hasErrors) {
      setReports(res.value.items);
    }
  }

  async function fetchTopUser() {
    const res = await statisticService.getTopDonations(6);
    if (!res.hasErrors) {
      setTopUsers(res.value.items);
    }
  }

  async function fetchDonationTimes() {
    const res = await statisticService.getDonationsTime(2022);
    if (!res.hasErrors) {
      setDonationTimes(res.value);
    }
  }

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
            <ChildrenSection data={donationTime} />
          </Card>
        </Col>
        <Col xs={24} lg={8} span={8} style={{ padding: "0px 5px 15px 5px" }}>
          <Card>
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#606060",
                fontSize: "13px",
              }}
            >
              Top Donation
            </div>

            {topUser?.map((v) => {
              <>
                <Row>
                  <Col span={24}>{v.fullName}</Col>
                  <Col
                    span={24}
                    style={{ color: "rgba(0,0,0,.45)", fontSize: "12px" }}
                  >
                    {v.email} - Donation times: {v.value}
                  </Col>
                </Row>
                <Divider style={{ margin: "10px 0" }} />
              </>;
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

            {/* <DonutPieChart data={donations} /> */}
          </Card>
        </Col>
        <Col span={12} xs={24} lg={12} style={{ padding: "10px 5px" }}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              Report
            </div>

            {/* <DonutPieChart data={reports} /> */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
