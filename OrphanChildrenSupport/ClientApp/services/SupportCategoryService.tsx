import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IFilterType } from "@Models/IFilterType";

import { IQueryResult } from "@Models/IQueryResult";
import { ISupportCategoryModel } from "@Models/ISupportCategoryModel";

export default class SupportCategoryService extends ServiceBase {
  public async getAll(): Promise<Result<IQueryResult<ISupportCategoryModel>>> {
    const result = await this.requestJson<IQueryResult<ISupportCategoryModel>>({
      url: `/api/supportCategories`,
      method: "GET",
    });
    return result;
  }

  public async search(
    value: IFilterType
  ): Promise<Result<IQueryResult<ISupportCategoryModel>>> {
    const result = await this.requestJson<IQueryResult<ISupportCategoryModel>>({
      url: `/api/supportCategories`,
      method: "GET",
      data: value,
    });

    return result;
  }

  public async update(model: ISupportCategoryModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/supportCategories/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/supportCategories/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async add(
    model: ISupportCategoryModel
  ): Promise<Result<ISupportCategoryModel>> {
    var result = await this.requestJson<ISupportCategoryModel>({
      url: "/api/supportCategories",
      method: "POST",
      data: model,
    });
    return result;
  }
}
