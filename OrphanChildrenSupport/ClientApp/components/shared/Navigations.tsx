import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBaby,
  cilBell,
  cilCalculator,
  cilGrid,
  cilPeople,
  cilPhone,
  cilSettings,
  cilSpeedometer,
  cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const navigations = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavTitle,
    name: "User Management",
  },
  {
    component: CNavItem,
    name: "Volunteer",
    to: "/admin/volunteer",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Registered User",
    to: "/user",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Children",
    to: "/admin/usermanagement/children",
    icon: <CIcon icon={cilBaby} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Support Category",
    to: "/admin/usermanagement/supportcategory",
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: "Other",
  },
  {
    component: CNavGroup,
    name: "Statistic",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "User",
        to: "/admin/statistic/user",
      },
      {
        component: CNavItem,
        name: "Donation",
        to: "/admin/statistic/donation",
      },
      {
        component: CNavItem,
        name: "Adopt Registration",
        to: "/admin/adopt",
      },
    ],
  },

  {
    component: CNavItem,
    name: "Notification",
    to: "/notification",
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Contact",
    to: "/contact",
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
  },
];

export default navigations;
