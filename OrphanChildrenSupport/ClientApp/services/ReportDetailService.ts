
import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IFilterType } from "@Models/IFilterType";
import { IQueryResult } from "@Models/IQueryResult";
import { IReportDetailModel } from "./../models/IReportModel";

export default class ReportDetailService extends ServiceBase {
  public async add(model: IReportDetailModel): Promise<Result<IReportDetailModel>> {
    var result = await this.requestJson<IReportDetailModel>({
      url: "/api/reportDetails",
      method: "POST",
      data: model,
    });
    return result;
  }

  public async getAll(): Promise<Result<IQueryResult<IReportDetailModel>>> {
    const result = await this.requestJson<IQueryResult<IReportDetailModel>>({
      url: `/api/reportDetails`,
      method: "GET",
    });
    return result;
  }

  
  public async search(
    value:IFilterType
  ): Promise<Result<IQueryResult<IReportDetailModel>>> {
    const result = await this.requestJson<IQueryResult<IReportDetailModel>>({
      url: `/api/reportDetails`,
      method: "GET",
      data:value
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reportDetails/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async getReport(id: number): Promise<Result<IReportDetailModel>> {
    const res = await this.requestJson<IReportDetailModel>({
      url: `/api/reportDetails/${id}`,
      method: "GET",
    });
    return res;
  }

  public async update(model: IReportDetailModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reportDetails/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

  public async cancelReportDetail(id): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reportDetails/cancel/${id}`,
      method: "PUT",
    });
    return result;
  }



  public async approveReportDetail(id): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reportDetails/finish/${id}`,
      method: "PUT",
    });
    return result;
  }


  public async rejectReportDetail(id): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reportDetails/reject/${id}`,
      method: "PUT",
    });
    return result;
  }

}
