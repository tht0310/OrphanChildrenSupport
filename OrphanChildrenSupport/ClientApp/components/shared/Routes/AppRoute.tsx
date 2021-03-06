import { IRegisterModel } from "@Models/ILoginModel";
import AccountService from "@Services/AccountService";
import * as React from "react";
import { Route, RouteProps, Redirect } from "react-router";
import responseContext from "../../../core/responseContext";
import SessionManager from "../../../core/session";

export interface IProps extends RouteProps {
  layout: React.ComponentClass<any>;
  statusCode?: number;
}

const AppRoute: React.FC<IProps> = ({
  component: Component,
  layout: Layout,
  statusCode: statusCode,
  path: Path,
  ...rest
}: IProps) => {
  let currentUser = null;
  let user: IRegisterModel = null;
  var isLoginPath = Path === "/login" || Path === "/register" ? true : false;
  var isAdminLoginPath = Path === "/admin/login" ? true : false;

  try {
    currentUser = localStorage.getItem("currentUser");
    user = JSON.parse(currentUser);
  } catch (error) {}

  if (currentUser !== "null" && currentUser !== null && isLoginPath) {
    return <Redirect to="/" />;
  }

  if (currentUser !== "null" && currentUser !== null && isAdminLoginPath) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default AppRoute;
