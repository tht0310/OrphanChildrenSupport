import { IForgotPasswordModel, IRegisterModel, IResetPasswordModel, IVerifyModel } from "./../models/ILoginModel";
import Result from "@Core/Result";
import { ILoginModel } from "@Models/ILoginModel";
import { ServiceBase } from "@Core/ServiceBase";
import SessionManager, { IServiceUser } from "@Core/session";

export default class AccountService extends ServiceBase {
  public async login(loginModel: ILoginModel): Promise<Result<IRegisterModel>> {
    var result = await this.requestJson<any>({
      url: "/api/accounts/authenticate",
      method: "POST",
      data: loginModel,
    });

    if (!result.hasErrors) {
      SessionManager.setServiceUser(result.value);
      var testObject = result.value;
      localStorage.setItem("currentUser", JSON.stringify(testObject));  
    }
    
    return result;
  }

  public async logout(): Promise<Result<{}>> {
    
  
      SessionManager.setServiceUser(null);
      localStorage.setItem('currentUser', null)
    

    return null
  }
  public async register(model: IRegisterModel): Promise<Result<{}>> {
    var result = await this.requestJson<{}>({
      url: "/api/Accounts/register",
      method: "POST",
      data: model,
    });
    return result;
  }

  public async verify(token: IVerifyModel): Promise<Result<{}>> {
    var result = await this.requestJson<{}>({
      url: "/api/accounts/verify-email",
      method: "POST",
      data: token,
    });
    return result;
  }

  public async forgotPassword(value: IForgotPasswordModel): Promise<Result<{}>> {
    var result = await this.requestJson<{}>({
      url: "/api/accounts/forgot-password",
      method: "POST",
      data: value,
    });
    return result;
  }

  public async resetPassword(value: IResetPasswordModel): Promise<Result<{}>> {
    var result = await this.requestJson<{}>({
      url: "/api/accounts/reset-password",
      method: "POST",
      data: value,
    });
    return result;
  }


  
}
