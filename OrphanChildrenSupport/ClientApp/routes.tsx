import DefaultLayout from "@Layouts/DefaultLayout";
import GuestLayout from "@Layouts/GuestLayout";
import ChildrenDetailPage from "@Pages/Admin/ChildrenDetailPage";
import AboutUsPage from "@Pages/Guest/AboutUsPage";
import ChildrenSupportedPage from "@Pages/Guest/ChildrenSupportedPage";
import ChildrenWaitingForSupportPage from "@Pages/Guest/ChildrenWaitingForSupportPage";
import GuestHomePage from "@Pages/Guest/GuestHomePage";
import RegisterPage from "@Pages/Login/RegisterPage";
import GuestLoginPage from "@Pages/Guest/GuestLoginPage";
import SupportCategoryPage from "@Pages/Admin/SupportCategoryPage";
import * as React from "react";
import AppRoute from "./components/shared/Routes/AppRoute";
import AuthorizedLayout from "./layouts/AuthorizedLayout";

import ChildrenCartPage from "@Pages/Guest/ChildrenCartPage";
import { Switch } from "react-router-dom";
import VolunteerPage from "@Pages/Admin/VolunteerPage";
import RegisteredProfilePage from "@Pages/Admin/UserProfilePage";
import ActivityHistoryPage from "@Pages/Guest/ActivityHistoryPage";
import ChildrenPage from "@Pages/Guest/ChildrenPage";
import ExamplePage from "@Pages/Guest/ExamplePage";
import DonationManagementPage from "@Pages/Admin/DonationManagementPage";
import DonationDetailPage from "@Pages/Admin/DonationDetailPage";
import ReportDetailPage from "@Pages/Admin/ReportDetailPage";
import StatisticPage from "@Pages/Guest/StatisticPage";
import ChildrenProfilePage from "@Pages/Admin/ChildrenProfilePage";
import ReportFieldCategoryPage from "@Pages/Admin/ReportFieldCategoryPage";
import ReportManagementPage from "@Pages/Admin/ReportManagementPage";
import AdminLoginPage from "@Components/shared/Admin/AdminLoginPage";
import AdminRoute from "@Components/shared/Routes/AdminRoute";
import ProtectedRoute from "@Components/shared/Routes/ProtectedRoute";
import NotAccessPage from "@Pages/NotAccessPage";
import BanAccountPage from "@Pages/BanAccountPage";
import RegisteredUserRoute from "@Components/shared/Routes/RegisteredUserRoute";
import NormalUserRoute from "@Components/shared/Routes/NormalUserRoute";
import NotFoundPage from "@Pages/NotFoundPage";
import ContactUsPage from "@Pages/Guest/ContactUsPage";
import Dashboard from "@Pages/Admin/Dashboard";
import AccountDetailPage from "@Pages/Guest/AccountDetailPage";
import ForgotPasswordPage from "@Pages/Login/ForgotPasswordPage";
import ResetPasswordPage from "@Pages/Login/ResetPasswordPage";
import VerifyPage from "@Pages/VerifyPage";

export const routes = (
  <Switch>
    {/* Protected Routes*/}

    <ProtectedRoute
      layout={AuthorizedLayout}
      path="/admin/profileManagement/systemUser"
      component={VolunteerPage}
    />

    {/* Admin Routes*/}
    <AdminRoute
      layout={AuthorizedLayout}
      exact
      path="/admin"
      component={Dashboard}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      exact
      path="/admin/myaccount"
      component={AccountDetailPage}
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
      path="/admin/profileManagement/children"
      component={ChildrenProfilePage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/activityManagement/supportCategory"
      component={SupportCategoryPage}
    />

    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/profileManagement/member"
      component={RegisteredProfilePage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/activityManagement/donation/:id"
      component={DonationDetailPage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/activityManagement/donation/"
      component={DonationManagementPage}
    />

    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/activityManagement/report/:id"
      component={ReportDetailPage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/statistic/"
      component={StatisticPage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/activityManagement/reportField"
      component={ReportFieldCategoryPage}
    />
    <AdminRoute
      layout={AuthorizedLayout}
      path="/admin/activityManagement/report"
      component={ReportManagementPage}
    />

    {/* Registered Routes*/}

    <RegisteredUserRoute
      layout={GuestLayout}
      path="/favourite"
      component={ChildrenCartPage}
    />

    <RegisteredUserRoute
      layout={GuestLayout}
      path="/myaccount"
      component={AccountDetailPage}
    />

    <RegisteredUserRoute
      layout={GuestLayout}
      path="/activityHistory/:key"
      component={ActivityHistoryPage}
    />
    <RegisteredUserRoute
      layout={GuestLayout}
      path="/activityHistory/"
      component={ActivityHistoryPage}
    />

    {/* Normal User Routes*/}

    <NormalUserRoute
      layout={GuestLayout}
      exact
      path="/"
      component={GuestHomePage}
    />

    <NormalUserRoute
      layout={GuestLayout}
      exact
      path="/home"
      component={GuestHomePage}
    />
    <NormalUserRoute
      layout={GuestLayout}
      exact
      path="/aboutUs"
      component={AboutUsPage}
    />
    <NormalUserRoute
      layout={GuestLayout}
      exact
      path="/contactUs"
      component={ContactUsPage}
    />

    <NormalUserRoute
      layout={GuestLayout}
      exact
      path="/childrenSupported"
      component={ChildrenSupportedPage}
    />
    <NormalUserRoute
      layout={GuestLayout}
      exact
      path="/childrenWaitingForSupport"
      component={ChildrenWaitingForSupportPage}
    />
    <NormalUserRoute
      layout={GuestLayout}
      path="/children/detail/:id"
      component={ChildrenDetailPage}
    />
    <NormalUserRoute
      layout={GuestLayout}
      path="/children"
      component={ChildrenPage}
    />

    {/* Default Routes*/}

    <AppRoute layout={GuestLayout} path="/register" component={RegisterPage} />

    <AppRoute
      layout={GuestLayout}
      exact
      path="/login"
      component={GuestLoginPage}
    />

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
      path="/accessError"
      component={NotAccessPage}
    />
    <AppRoute
      layout={DefaultLayout}
      exact
      path="/accountError"
      component={BanAccountPage}
    />
    <AppRoute layout={DefaultLayout} exact path="/*" component={NotFoundPage} />
  </Switch>
);
