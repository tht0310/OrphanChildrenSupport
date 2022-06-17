import { IReportModel } from './../models/IReportModel';
import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IFilterType } from "@Models/IFilterType";
import { IQueryResult } from "@Models/IQueryResult";
import { IDonationModel } from '@Models/IDonationModel';

export default class ReportService extends ServiceBase {
  public async add(model: IReportModel): Promise<Result<IReportModel>> {
    var result = await this.requestJson<IReportModel>({
      url: "/api/deports",
      method: "POST",
      data: model,
    });
    return result;
  }

  public async getAll(): Promise<Result<IQueryResult<IReportModel>>> {
    const result = await this.requestJson<IQueryResult<IReportModel>>({
      url: `/api/deports`,
      method: "GET",
    });
    return result;
  }

  
  public async search(
    value:IFilterType
  ): Promise<Result<IQueryResult<IReportModel>>> {
    const result = await this.requestJson<IQueryResult<IReportModel>>({
      url: `/api/deports`,
      method: "GET",
      data:value
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/deports/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async getReport(id: number): Promise<Result<IReportModel>> {
    const res = await this.requestJson<IReportModel>({
      url: `/api/deports/${id}`,
      method: "GET",
    });
    return res;
  }

  public async update(model: IReportModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/deports/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

}
