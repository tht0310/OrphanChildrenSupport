import { IReportFieldModel } from './../models/IReportFieldModel';
import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IFilterType } from "@Models/IFilterType";
import { IQueryResult } from "@Models/IQueryResult";


export default class ReportFieldService extends ServiceBase {
  public async getAll(): Promise<Result<IQueryResult<IReportFieldModel>>> {
    const result = await this.requestJson<IQueryResult<IReportFieldModel>>({
      url: `/api/reportFieldCategories`,
      method: "GET",
    });
    return result;
  }

  public async search(
    value: IFilterType
  ): Promise<Result<IQueryResult<IReportFieldModel>>> {
    const result = await this.requestJson<IQueryResult<IReportFieldModel>>({
      url: `/api/reportFieldCategories`,
      method: "GET",
      data: value,
    });

    return result;
  }

  public async update(model: IReportFieldModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reportFieldCategories/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/reportFieldCategories/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async add(
    model: IReportFieldModel
  ): Promise<Result<IReportFieldModel>> {
    var result = await this.requestJson<IReportFieldModel>({
      url: "/api/reportFieldCategories",
      method: "POST",
      data: model,
    });
    return result;
  }
}
