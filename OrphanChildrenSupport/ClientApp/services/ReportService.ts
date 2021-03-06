import { IReportModel } from "./../models/IReportModel";
import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IFilterType } from "@Models/IFilterType";
import { IQueryResult } from "@Models/IQueryResult";
import { IDonationModel } from "@Models/IDonationModel";

type Params = {
  fullNameOrEmail?: string;
  childrenProfileStatus?: number;
  isNeedToBeAdopted?: string;
  gender?: boolean;
  fromAge?: number;
  toAge?: number;
  supportCategoryId?: number;
  accountId?: number;
};
export type ChildrenParams = Params & IFilterType;
export default class ReportService extends ServiceBase {
  public async add(model: IReportModel): Promise<Result<IReportModel>> {
    var result = await this.requestJson<IReportModel>({
      url: "/api/reports",
      method: "POST",
      data: model,
    });
    return result;
  }

  public async getAll(
    param?: ChildrenParams
  ): Promise<Result<IQueryResult<IReportModel>>> {
    const result = await this.requestJson<IQueryResult<IReportModel>>({
      url: `/api/reports`,
      method: "GET",
      data: param,
    });
    return result;
  }

  public async search(
    value: IFilterType
  ): Promise<Result<IQueryResult<IReportModel>>> {
    const result = await this.requestJson<IQueryResult<IReportModel>>({
      url: `/api/reports`,
      method: "GET",
      data: value,
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reports/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async getReport(id: number): Promise<Result<IReportModel>> {
    const res = await this.requestJson<IReportModel>({
      url: `/api/reports/${id}`,
      method: "GET",
    });
    return res;
  }

  public async update(model: IReportModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reports/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

  public async getReportStatistc(): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reports/getStatistics`,
      method: "PUT",
    });
    return result;
  }

  public async cancelReport(id): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reports/cancel/${id}`,
      method: "PUT",
    });
    return result;
  }

  public async approveReport(id): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reports/approve/${id}`,
      method: "PUT",
    });
    return result;
  }

  public async rejectReport(id): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reports/reject/${id}`,
      method: "PUT",
    });
    return result;
  }
}
