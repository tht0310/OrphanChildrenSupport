import React, { useState } from "react";
import { Tabs } from "antd";

import { RouteComponentProps } from "react-router-dom";

import DonationHistoryPage from "./DonationHistoryPage";
import { HistoryOutlined, NotificationOutlined } from "@ant-design/icons";
import NoficationPage from "./NoficationPage";
import ReportHistoryPage from "./ReportHistoryPage";

type Props = RouteComponentProps<{ key: string }>;

const ActivityHistoryPage: React.FC<Props> = ({ match, location }: Props) => {
  return (
    <div
      style={{ margin: "2%", marginTop: "25px" }}
      className="activity-history-page"
    >
      <Tabs defaultActiveKey={match.params.key} tabPosition={"left"}>
        <Tabs.TabPane
          tab={
            <>
              <HistoryOutlined /> Donation History
            </>
          }
          key="2"
          style={{ paddingLeft: "5%", paddingRight: "4%" }}
        >
          <DonationHistoryPage />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <>
              <HistoryOutlined /> Report History
            </>
          }
          key="1"
          style={{ paddingLeft: "5%", paddingRight: "4%" }}
        >
          <ReportHistoryPage />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <>
              <NotificationOutlined /> Notification
            </>
          }
          key="3"
        >
          <NoficationPage />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default ActivityHistoryPage;
