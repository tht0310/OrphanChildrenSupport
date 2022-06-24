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

const RegisteredUserRoute: React.FC<IProps> = ({
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

  if (user === null) {
    return <Redirect to="/" />;
  }

  if (currentUser !== "null" && currentUser !== null && isLoginPath) {
    return <Redirect to="/" />;
  }

  (async () => {
    let isActive: boolean = true;
    if (user !== null) {
      const res = await accountService.getAccount(user.id);
      if (res.value.isActive === false) {
        isActive = false;
      }
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

export default RegisteredUserRoute;
