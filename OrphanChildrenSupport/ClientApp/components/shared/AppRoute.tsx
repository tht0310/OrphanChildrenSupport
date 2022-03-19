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
  // var isLoginPath = Path === "/";

  // if (!SessionManager.isAuthenticated && !isLoginPath) {
  //   return <Redirect to="/" />;
  // }

  // if (SessionManager.isAuthenticated && isLoginPath) {
  //   return <Redirect to="/" />;
  // }

  if (statusCode == null) {
    responseContext.statusCode = 200;
  } else {
    responseContext.statusCode = statusCode;
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
