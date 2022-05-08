import DefaultLayout from "@Layouts/DefaultLayout";
import GuestLayout from "@Layouts/GuestLayout";
import ChildrenDetailPage from "@Pages/ChildrenDetailPage";
import AboutUsPage from "@Pages/Guest/AboutUsPage";
import ChildrenSupportedPage from "@Pages/Guest/ChildrenSupportedPage";
import ChildrenWaitingForSupportPage from "@Pages/Guest/ChildrenWaitingForSupportPage";
import ContactUsPage from "@Pages/Guest/ContactUs";
import GuestHomePage from "@Pages/Guest/GuestHomePage";

import PersonalProfilePage from "@Pages/PersonalProfilePage";
import RegisterPage from "@Pages/RegisterPage";
import GuestLoginPage from "@Pages/GuestLoginPage";
import SupportCategoryPage from "@Pages/SupportCategoryPage";
import * as React from "react";
import { Switch } from "react-router-dom";
import AppRoute from "./components/shared/AppRoute";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import Dashboard from "./pages/Dashboard";
import VerifyPage from "@Pages/VerifyPage";
import ResetPasswordPage from "@Pages/ResetPasswordPage";
import ForgotPasswordPage from "@Pages/ForgotPasswordPage";
import ExamplePage from "@Pages/ExamplesPage";
import AccountDetailPage from "@Pages/AccountDetailPage";

export const routes = (
  <Switch>
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/admin"
      component={Dashboard}
    />
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/admin/dashboard"
      component={Dashboard}
    />
    <AppRoute layout={GuestLayout} exact path="/" component={GuestHomePage} />
    <AppRoute
      layout={AuthorizedLayout}
      exact
      path="/admin/usermanagement/children"
      component={PersonalProfilePage}
    />
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
    <AppRoute
      layout={AuthorizedLayout}
      path="/admin/usermanagement/supportcategory"
      component={SupportCategoryPage}
    />
    <AppRoute layout={GuestLayout} path="/register" component={RegisterPage} />

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
    <AppRoute layout={DefaultLayout} path="/example" component={ExamplePage} />
  </Switch>
);
