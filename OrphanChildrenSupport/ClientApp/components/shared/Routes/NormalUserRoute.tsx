import { IRegisterModel } from "@Models/ILoginModel";
import AccountService from "@Services/AccountService";
import * as React from "react";
import { Route, RouteProps, Redirect } from "react-router";

export interface IProps extends RouteProps {
  layout: React.ComponentClass<any>;
  statusCode?: number;
}
const accountService = new AccountService();
const NormalUserRoute: React.FC<IProps> = ({
  component: Component,
  layout: Layout,
  statusCode: statusCode,
  path: Path,
  ...rest
}: IProps) => {
  let currentUser = null;
  let user: IRegisterModel = null;
  var isLoginPath = Path === "/login" || Path === "/register" ? true : false;

  try {
    currentUser = localStorage.getItem("currentUser");
    user = JSON.parse(currentUser);
  } catch (error) {}

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

export default NormalUserRoute;
