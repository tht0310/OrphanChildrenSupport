import DefaultLayout from "@Layouts/DefaultLayout";
import GuestLayout from "@Layouts/GuestLayout";
import ChildrenDetailPage from "@Pages/ChildrenDetailPage";
import AboutUsPage from "@Pages/Guest/AboutUsPage";
import ChildrenSupportedPage from "@Pages/Guest/ChildrenSupportedPage";
import ChildrenWaitingForSupportPage from "@Pages/Guest/ChildrenWaitingForSupportPage";
import ContactUsPage from "@Pages/Guest/ContactUs";
import GuestHomePage from "@Pages/Guest/GuestHomePage";

import LoginPage from "@Pages/LoginPage";
import PersonalProfilePage from "@Pages/PersonalProfilePage";
import RegisterPage from "@Pages/RegisterPage";
import SignInPage from "@Pages/SignInPage";
import SupportCategoryPage from "@Pages/SupportCategoryPage";
import * as React from "react";
import { Switch } from "react-router-dom";
import AppRoute from "./components/shared/AppRoute";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import Dashboard from "./pages/Dashboard";

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
      path="/admin/children"
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
      layout={DefaultLayout}
      exact
      path="/signin"
      component={SignInPage}
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
      path="/admin/supportCategory"
      component={SupportCategoryPage}
    />
    <AppRoute
      layout={DefaultLayout}
      path="/register"
      component={RegisterPage}
    />
  </Switch>
);
