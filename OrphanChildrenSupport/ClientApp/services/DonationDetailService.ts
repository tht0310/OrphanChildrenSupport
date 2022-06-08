
import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IDonationDetailModel } from "@Models/IDonationModel";
import { IFilterType } from "@Models/IFilterType";
import { IQueryResult } from "@Models/IQueryResult";


export default class DonationDetailService extends ServiceBase {
  public async add(model: IDonationDetailModel): Promise<Result<IDonationDetailModel>> {
    var result = await this.requestJson<IDonationDetailModel>({
      url: "/api/donationDetails",
      method: "POST",
      data: model,
    });
    return result;
  }

  public async getAll(): Promise<Result<IQueryResult<IDonationDetailModel>>> {
    const result = await this.requestJson<IQueryResult<IDonationDetailModel>>({
      url: `/api/donationDetails`,
      method: "GET",
    });
    return result;
  }

  
  public async search(
    value:IFilterType
  ): Promise<Result<IQueryResult<IDonationDetailModel>>> {
    const result = await this.requestJson<IQueryResult<IDonationDetailModel>>({
      url: `/api/donationDetails`,
      method: "GET",
      data:value
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/donationDetails/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async getdonation(id: number): Promise<Result<IDonationDetailModel>> {
    const res = await this.requestJson<IDonationDetailModel>({
      url: `/api/donationDetails/${id}`,
      method: "GET",
    });
    return res;
  }

  public async update(model: IDonationDetailModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/donationDetails/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

}
