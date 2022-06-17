import DefaultLayout from "@Layouts/DefaultLayout";
import GuestLayout from "@Layouts/GuestLayout";
import ChildrenDetailPage from "@Pages/ChildrenDetailPage";
import AboutUsPage from "@Pages/Guest/AboutUsPage";
import ChildrenSupportedPage from "@Pages/Guest/ChildrenSupportedPage";
import ChildrenWaitingForSupportPage from "@Pages/Guest/ChildrenWaitingForSupportPage";
import ContactUsPage from "@Pages/Guest/ContactUs";
import GuestHomePage from "@Pages/Guest/GuestHomePage";

import RegisterPage from "@Pages/RegisterPage";
import GuestLoginPage from "@Pages/GuestLoginPage";
import SupportCategoryPage from "@Pages/SupportCategoryPage";
import * as React from "react";
import AppRoute from "./components/shared/AppRoute";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import Dashboard from "./pages/Dashboard";
import VerifyPage from "@Pages/VerifyPage";
import ResetPasswordPage from "@Pages/ResetPasswordPage";
import ForgotPasswordPage from "@Pages/ForgotPasswordPage";

import AccountDetailPage from "@Pages/AccountDetailPage";
import ChildrenCartPage from "@Pages/Guest/ChildrenCartPage";
import { Switch } from "react-router-dom";
import VolunteerPage from "@Pages/VolunteerPage";
import RegisteredProfilePage from "@Pages/UserProfilePage";
import ActivityHistoryPage from "@Pages/Guest/ActivityHistoryPage";
import ChildrenPage from "@Pages/Guest/ChildrenPage";
import ExamplePage from "@Pages/Guest/ExamplePage";
import DonationManagementPage from "@Pages/DonationManagementPage";
import DonationDetailPage from "@Pages/DonationDetailPage";
import ReportDetailPage from "@Pages/ReportDetailPage";
import StatisticPage from "@Pages/Guest/StatisticPage";
import ChildrenProfilePage from "@Pages/ChildrenProfilePage";
import ReportFieldCategoryPage from "@Pages/ReportFieldCategoryPage";
import ReportManagementPage from "@Pages/ReportManagementPage";
import AdminLoginPage from "@Components/shared/Admin/AdminLoginPage";
import AdminRoute from "@Components/shared/AdminRoute";
import ProtectedRoute from "@Components/shared/ProtectedRoute";
import NotAccessPage from "@Pages/NotAccessPage";
import TempPage from "@Pages/TempPage";

export const routes = (
  <Switch>
    {/* Admin_Calendar */}
    <AdminRoute
      layout={AuthorizedLayout}
      exact
      path="/admin"
      component={Dashboard}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      exact
      path="/admin/dashboard"
      component={Dashboard}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      exact
      path="/admin/usermanagement/children"
      component={ChildrenProfilePage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/usermanagement/supportcategory"
      component={SupportCategoryPage}
    />
    <ProtectedRoute
      layout={AuthorizedLayout}
      path="/admin/volunteer"
      component={VolunteerPage}
    />

    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/user"
      component={RegisteredProfilePage}
    />

    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/activitymanagement/donation/"
      component={DonationManagementPage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/donation/detail/:id"
      component={DonationDetailPage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/report/detail/:id"
      component={ReportDetailPage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/statistic/"
      component={StatisticPage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/activitymanagement/reportfield"
      component={ReportFieldCategoryPage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/activitymanagement/report"
      component={ReportManagementPage}
    />

    <AppRoute layout={GuestLayout} path="/cart" component={ChildrenCartPage} />
    <AppRoute layout={GuestLayout} exact path="/" component={GuestHomePage} />

    <AppRoute
      layout={GuestLayout}
      exact
      path="/home"
      component={GuestHomePage}
    />
    <AppRoute
      layout={GuestLayout}
      exact
      path="/aboutUs"
      component={AboutUsPage}
    />
    <AppRoute
      layout={GuestLayout}
      exact
      path="/contactUs"
      component={ContactUsPage}
    />
    <AppRoute
      layout={GuestLayout}
      exact
      path="/login"
      component={GuestLoginPage}
    />
    <AppRoute
      layout={GuestLayout}
      exact
      path="/childrenSupported"
      component={ChildrenSupportedPage}
    />
    <AppRoute
      layout={GuestLayout}
      exact
      path="/childrenWaitingForSupport"
      component={ChildrenWaitingForSupportPage}
    />
    <AppRoute
      layout={GuestLayout}
      path="/children/detail/:id"
      component={ChildrenDetailPage}
    />

    <AppRoute layout={GuestLayout} path="/register" component={RegisterPage} />

    <AppRoute
      layout={GuestLayout}
      path="/accounts/verify-email"
      component={VerifyPage}
    />
    <AppRoute
      layout={GuestLayout}
      path="/forgotPassword"
      component={ForgotPasswordPage}
    />
    <AppRoute
      layout={GuestLayout}
      path="/accounts/reset-password"
      component={ResetPasswordPage}
    />
    <AppRoute
      layout={GuestLayout}
      path="/myaccount"
      component={AccountDetailPage}
    />

    <AppRoute layout={GuestLayout} path="/cart" component={ChildrenCartPage} />
    <AppRoute
      layout={GuestLayout}
      path="/activityHistory/:key"
      component={ActivityHistoryPage}
    />
    <AppRoute
      layout={GuestLayout}
      path="/activityHistory/"
      component={ActivityHistoryPage}
    />
    <AppRoute layout={GuestLayout} path="/children" component={ChildrenPage} />
    <AppRoute layout={DefaultLayout} path="/example" component={ExamplePage} />

    <AppRoute
      layout={DefaultLayout}
      exact
      path="/admin/login"
      component={AdminLoginPage}
    />

    <AppRoute
      layout={DefaultLayout}
      exact
      path="/accesserror"
      component={NotAccessPage}
    />
    <AppRoute layout={DefaultLayout} exact path="/temp" component={TempPage} />
    <AdminRoute
      layout={AuthorizedLayout}
      exact
      path="/admin/myaccount"
      component={AccountDetailPage}
    />
  </Switch>
);
