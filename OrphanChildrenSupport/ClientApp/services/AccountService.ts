import { IForgotPasswordModel, IRegisterModel, IResetPasswordModel, IVerifyModel } from "./../models/ILoginModel";
import Result from "@Core/Result";
import { ILoginModel } from "@Models/ILoginModel";
import { ServiceBase } from "@Core/ServiceBase";
import SessionManager, { IServiceUser } from "@Core/session";
import { IQueryResult } from "@Models/IQueryResult";
import { IFilterType } from "@Models/IFilterType";

type Params = {
  fullNameOrEmail?: string;
  childrenProfileStatus?: number;
  isNeedToBeAdopted?: string;
  gender?: boolean;
  fromAge?: number;
  toAge?: number;
  supportCategoryId?:number,
  accountId?:number
  role?:string
};

export type ChildrenParams = Params & IFilterType;
export default class AccountService extends ServiceBase {
  public async login(loginModel: ILoginModel): Promise<Result<IRegisterModel>> {
    var result = await this.requestJson<any>({
      url: "/api/accounts/authenticate",
      method: "POST",
      data: loginModel,
    });
    
    if (!result.hasErrors) {
      SessionManager.setServiceUser(result.value);
      const user:IRegisterModel = result.value
      const testObject:ILoginModel = {id:user.id, jwtToken:user.jwtToken, fullName:user.fullName,role:user.role, email:user.email};
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
      url: "/api/accounts/register",
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

  public async getAll(param?:ChildrenParams): Promise<Result<IQueryResult<IRegisterModel>>> {
    const result = await this.requestJson<IQueryResult<IRegisterModel>>({
      url: `/api/accounts`,
      method: "GET",
      data: param
    });
    return result;
  }

  public async getAllUser(): Promise<Result<IRegisterModel[]>> {
    const result = await this.requestJson<IRegisterModel[]>({
      url: `/api/accounts`,
      method: "GET",
    });
    return result;
  }

  

  public async getAccount(id: number): Promise<Result<IRegisterModel>> {
    const res = await this.requestJson<IRegisterModel>({
      url: `/api/accounts/${id}`,
      method: "GET",
    });
    return res;
  }


  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/accounts/${id}`,
      method: "DELETE",
    });
    return result;
  }

  
  public async update(model: IRegisterModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/accounts/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

  public async add(model: IRegisterModel): Promise<Result<IRegisterModel>> {
    var result = await this.requestJson<IRegisterModel>({
      url: `/api/accounts`,
      method: "POST",
      data: model,
    });
    return result;
  }
  

  public async search(
    value:IFilterType
  ): Promise<Result<IRegisterModel[]>> {
    const result = await this.requestJson<IRegisterModel[]>({
      url: `/api/accounts`,
      method: "GET",
      data:value
    });

    return result;
  }

  public async updateRole(id:number, role:number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/accounts/${id}/update-role/?role=${role}`,
      method: "PUT",
      data: role,
    });
    return result;
  }

 

  public async deactiveUser(id:number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/accounts/deactivate-account/${id}`,
      method: "PUT",
    });
    return result;
  }

  public async activeUser(id:number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/accounts/activate-account/${id}`,
      method: "PUT",
    });
    return result;
  }

  


 

  
}
