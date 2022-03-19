import { IChildrenSupportCategoryModel } from './../models/IChildrenSupportCategoryModel';

import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { IQueryResult } from "@Models/IQueryResult";



export default class ChildrenSupportCategoryService extends ServiceBase {
  public async searchChildrenCategory(id:number): Promise<Result<IQueryResult<IChildrenSupportCategoryModel>>> {
    const result = await this.requestJson<IQueryResult<IChildrenSupportCategoryModel>>({
      url: `/api/childrenSupportCategories/${id}`,
      method: "GET",
    });
    return result;
  }

  public async addChildrenCategory(value:IChildrenSupportCategoryModel): Promise<Result<IQueryResult<IChildrenSupportCategoryModel>>> {
    const result = await this.requestJson<IQueryResult<IChildrenSupportCategoryModel>>({
      url: `/api/childrenSupportCategories`,
      method: "POST",
      data:value
    });
    return result;
  }
}