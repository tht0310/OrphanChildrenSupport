import { IForgotPasswordModel, IRegisterModel, IResetPasswordModel, IVerifyModel } from "./../models/ILoginModel";
import Result from "@Core/Result";
import { ILoginModel } from "@Models/ILoginModel";
import { ServiceBase } from "@Core/ServiceBase";
import SessionManager, { IServiceUser } from "@Core/session";
import { IQueryResult } from "@Models/IQueryResult";
import { IFilterType } from "@Models/IFilterType";

export default class AccountService extends ServiceBase {

  public async getAll(): Promise<Result<IQueryResult<IRegisterModel>>> {
    const result = await this.requestJson<IQueryResult<IRegisterModel>>({
      url: `/api/accounts`,
      method: "GET",
    });
    return result;
  }


}
