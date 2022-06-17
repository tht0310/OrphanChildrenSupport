import * as React from "react";
import { Route, RouteProps, Redirect } from "react-router";
import responseContext from "../../core/responseContext";
import SessionManager from "../../core/session";

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
  var isLoginPath = Path === "/login" || Path === "/register" ? true : false;
  try {
    var currentUser = localStorage.getItem("currentUser");
  } catch (error) {}

  if (currentUser !== "null" && currentUser !== null && isLoginPath) {
    return <Redirect to="/" />;
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
