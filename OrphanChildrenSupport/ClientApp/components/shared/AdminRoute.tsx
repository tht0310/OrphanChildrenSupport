import { IRegisterModel } from "@Models/ILoginModel";
import * as React from "react";
import { Route, RouteProps, Redirect } from "react-router";
import responseContext from "../../core/responseContext";
import SessionManager from "../../core/session";

export interface IProps extends RouteProps {
  layout: React.ComponentClass<any>;
  statusCode?: number;
}

const AdminRoute: React.FC<IProps> = ({
  component: Component,
  layout: Layout,
  statusCode: statusCode,
  path: Path,
  ...rest
}: IProps) => {
  var isLoginPath =
    Path === "/admin/login" || Path === "/register" ? true : false;

  let currentUser;
  let user: IRegisterModel = null;

  try {
    currentUser = localStorage.getItem("currentUser");
    user = JSON.parse(currentUser);
  } catch (error) {}
  console.log(user);
  if (user === null) {
    return <Redirect to="/admin/login" />;
  }
  if (user !== null && isLoginPath) {
    return <Redirect to="/admin" />;
  }
  if (user !== null) {
    if (user.role === "User") {
      return <Redirect to="/" />;
    }
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

export default AdminRoute;
