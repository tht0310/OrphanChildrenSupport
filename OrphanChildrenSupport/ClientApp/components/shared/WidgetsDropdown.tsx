import React from "react";
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CDropdownMenu,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilArrowTop, cilOptions } from "@coreui/icons";

const WidgetsDropdown = () => {
  return (
    <CRow className="custom-widget">
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={<>Children </>}
          title="Total: 8"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="secondary"
          value={<>Volunteer</>}
          title="Total: 6"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={<>User</>}
          title="Total: 6"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="dark"
          value={<>Total: 6</>}
          title="Donation"
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
