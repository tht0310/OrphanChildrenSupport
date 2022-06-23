import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";
import queryString from "query-string";
import AccountService from "@Services/AccountService";
import { IVerifyModel } from "@Models/ILoginModel";
import { Form, Input } from "antd";
type Props = RouteComponentProps<{}>;

const accService = new AccountService();

const VerifyPage: React.FC<Props> = ({ match, history, location }: Props) => {
  const [token, setToken] = React.useState<IVerifyModel>();
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    setToken({ token: queryString.parse(location.search).token });
  }, [location.search]);

  React.useEffect(() => {
    if (token) {
      verify(token);
    }
  }, [token]);

  async function verify(token: any) {
    if (token) {
      const res = await accService.verify(token);

      if (!res.hasErrors) {
        setIsSuccess(true);
      }
    }
  }

  return (
    <div className="container-fuild verify-message">
      {isSuccess && (
        <div>Your account is verified succesfully. Please login</div>
      )}
    </div>
  );
};

export default VerifyPage;
