import { IDonationDetailModel } from './../models/IDonationModel';
import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IDonationModel } from "@Models/IDonationModel";
import { IFilterType } from "@Models/IFilterType";
import { IQueryResult } from "@Models/IQueryResult";
import { RcFile } from 'antd/lib/upload';


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
export default class DonationService extends ServiceBase {
  public async add(model: IDonationModel): Promise<Result<IDonationModel>> {
    var result = await this.requestJson<IDonationModel>({
      url: "/api/donations",
      method: "POST",
      data: model,
    });
    return result;
  }

  public async getAll(param?:ChildrenParams): Promise<Result<IQueryResult<IDonationModel>>> {
    const result = await this.requestJson<IQueryResult<IDonationModel>>({
      url: `/api/donations`,
      method: "GET",
      data: param
    });
    return result;
  }

  public async search(
    value:IFilterType
  ): Promise<Result<IQueryResult<IDonationModel>>> {
    const result = await this.requestJson<IQueryResult<IDonationModel>>({
      url: `/api/donations`,
      method: "GET",
      data:value
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/donations/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async getDonation(id: number): Promise<Result<IDonationModel>> {
    const res = await this.requestJson<IDonationModel>({
      url: `/api/donations/${id}`,
      method: "GET",
    });
    return res;
  }

  public async update(model: IDonationModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/donations/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

 

  



}
