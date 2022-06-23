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

const accountService = new AccountService();
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

  (async () => {
    let isAccess: boolean = true;
    let isActive: boolean = true;
    if (user !== null) {
      const res = await accountService.getAccount(user.id);
      if (res.value.role !== "Admin") {
        isAccess = false;
      }
      if (res.value.isActive === false) {
        isActive = false;
      }
    }

    if (!isAccess) {
      window.location.href = "/accessError";
    }
    if (!isActive) {
      window.location.href = "/accountError";
    }
  })();

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
