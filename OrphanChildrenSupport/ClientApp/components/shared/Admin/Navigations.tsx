import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBaby,
  cilBell,
  cilCalculator,
  cilGrid,
  cilHeart,
  cilPeople,
  cilPhone,
  cilSpeedometer,
  cilUser,
  cilWarning,
} from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

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
    to: "/admin/user",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Children",
    to: "/admin/usermanagement/children",
    icon: <CIcon icon={cilBaby} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: "Activity Management",
  },
  {
    component: CNavItem,
    name: "Donation",
    to: "/admin/activitymanagement/donation",
    icon: <CIcon icon={cilHeart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Support Category",
    to: "/admin/usermanagement/supportcategory",
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Report",
    to: "/admin/activitymanagement/report",
    icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: "Other",
  },
  {
    component: CNavItem,
    name: "Statistic",
    to: "/admin/statistic",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Contact",
    to: "/contact",
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
  },
];

export default navigations;
