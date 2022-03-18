import DefaultLayout from "@Layouts/DefaultLayout";
import GuestLayout from "@Layouts/GuestLayout";
import AboutUsPage from "@Pages/Guest/AboutUsPage";
import GuestHomePage from "@Pages/Guest/GuestHomePage";

import LoginPage from "@Pages/LoginPage";
import PersonalProfilePage from "@Pages/PersonalProfilePage";
import SignInPage from "@Pages/SignInPage";
import * as React from "react";
import { Switch } from "react-router-dom";
import AppRoute from "./components/shared/AppRoute";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import Dashboard from "./pages/Dashboard";


export const routes = (
  <Switch>
    <AppRoute layout={AuthorizedLayout} exact path="/admin" component={Dashboard} />
    <AppRoute layout={AuthorizedLayout} exact path="/admin/dashboard" component={Dashboard}/>
    <AppRoute layout={GuestLayout} exact path="/" component={GuestHomePage}/>
    <AppRoute layout={DefaultLayout} exact path="/login" component={LoginPage}/>
    <AppRoute layout={AuthorizedLayout} exact path="/admin/children" component={PersonalProfilePage}/>
    <AppRoute layout={GuestLayout} exact path="/home" component={GuestHomePage}/>
    <AppRoute layout={GuestLayout} exact path="/aboutUs" component={AboutUsPage}/>
    <AppRoute layout={DefaultLayout} exact path="/signin" component={SignInPage}/>
  </Switch>
  
);
