import { INotificationModel } from './../models/INotificationModel';
import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IFilterType } from "@Models/IFilterType";
import { IQueryResult } from "@Models/IQueryResult";

type Params = {
    fullNameOrEmail?: string;
    childrenProfileStatus?: number;
    isNeedToBeAdopted?: string;
    gender?: boolean;
    fromAge?: number;
    toAge?: number;
    supportCategoryId?:number,
    accountId?:number
  };
  
export type ChildrenParams = Params & IFilterType;

export default class NotificationService extends ServiceBase {
 
  public async getAll(param?:ChildrenParams): Promise<Result<IQueryResult<INotificationModel>>> {
    const result = await this.requestJson<IQueryResult<INotificationModel>>({
      url: `/api/notifications`,
      method: "GET",
      data: param
    });
    return result;
  }

  public async update(model:INotificationModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/notifications/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/notifications/${id}`,
      method: "DELETE",
    });
    return result;
  }

}
