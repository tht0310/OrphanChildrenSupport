import React, { useEffect } from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import ChildrenProfileService from "@Services/ChildrenProfileService";
import { Space } from "antd";
import AccountService from "@Services/AccountService";
import DonationService from "@Services/DonationService";

const userService = new AccountService();
const childrenProfileService = new ChildrenProfileService();
const donationService = new DonationService();

const WidgetsDropdown = () => {
  const [totalChildren, setToTalChildren] = React.useState<number>();
  const [totalVolunteer, setVolunteer] = React.useState<number>();
  const [totalUser, setTotalUser] = React.useState<number>();
  const [donatiom, setDonation] = React.useState<number>();

  useEffect(() => {
    fetchChildrenProfile();
    fetchUserProfile();
    fetchDonation();
  }, []);

  async function fetchChildrenProfile() {
    const dataRes = await childrenProfileService.getAll();
    if (!dataRes.hasErrors) {
      setToTalChildren(dataRes.value.totalItems);
    }
  }

  async function fetchUserProfile() {
    let res = await userService.getAll({ role: "SystemUser" });
    if (!res.hasErrors) {
      setVolunteer(res.value.totalItems);
    }
    res = await userService.getAll({ role: "User" });
    if (!res.hasErrors) {
      setTotalUser(res.value.totalItems);
    }
  }

  async function fetchDonation() {
    const dataRes = await donationService.getAll();
    if (!dataRes.hasErrors) {
      setDonation(dataRes.value.totalItems);
    }
  }

  return (
    <CRow className="custom-widget">
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={<>Children </>}
          title={
            <Space>
              <span>Total: </span>
              {totalChildren}
            </Space>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="secondary"
          value={<>Volunteer</>}
          title={
            <Space>
              <span>Total: </span>
              {totalVolunteer}
            </Space>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={<>User</>}
          title={
            <Space>
              <span>Total: </span>
              {totalUser}
            </Space>
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="dark"
          value={<>Donation</>}
          title={
            <Space>
              <span>Total: </span>
              {donatiom}
            </Space>
          }
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
