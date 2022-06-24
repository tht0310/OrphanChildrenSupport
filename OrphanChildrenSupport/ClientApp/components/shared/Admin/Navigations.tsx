import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBaby,
  cilBell,
  cilCalculator,
  cilGrid,
  cilHeart,
  cilObjectUngroup,
  cilPeople,
  cilPhone,
  cilPlaylistAdd,
  cilSpeedometer,
  cilUser,
  cilWarning,
} from "@coreui/icons";
import { CNavItem, CNavTitle } from "@coreui/react";

const adminMenu = [
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
    name: "Profile Management",
  },
  {
    component: CNavItem,
    name: "System Users",
    to: "/admin/profileManagement/systemUsers",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Members",
    to: "/admin/profileManagement/members",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Children",
    to: "/admin/profileManagement/children",
    icon: <CIcon icon={cilBaby} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: "Activity Management",
  },
  {
    component: CNavItem,
    name: "Donations",
    to: "/admin/activityManagement/donations",
    icon: <CIcon icon={cilHeart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Support Categories",
    to: "/admin/activityManagement/supportCategories",
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Reports",
    to: "/admin/activityManagement/reports",
    icon: <CIcon icon={cilObjectUngroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Report Fields",
    to: "/admin/activityManagement/reportFields",
    icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
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
];

const volunteerMenu = [
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
    name: "Registered User",
    to: "/admin/user",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Children",
    to: "/admin/profileManagement/children",
    icon: <CIcon icon={cilBaby} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: "Activity Management",
  },
  {
    component: CNavItem,
    name: "Donation",
    to: "/admin/activityManagement/donations",
    icon: <CIcon icon={cilHeart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Support Category",
    to: "/admin/activityManagement/supportCategories",
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Report",
    to: "/admin/activitymanagement/report",
    icon: <CIcon icon={cilObjectUngroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Report Fields",
    to: "/admin/activityManagement/reportFields",
    icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
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
];

export const getMenus = (isAdmin: boolean) => {
  return isAdmin ? adminMenu : volunteerMenu;
};
