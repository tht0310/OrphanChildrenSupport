import { IFavoriteModel } from '../models/IFavoriteModel';
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
  supportCategoryId?:number
  accountId?: number
};

export type ChildrenParams = Params & IFilterType;
export default class FavoriteService extends ServiceBase {
  
    public async add(model: IFavoriteModel): Promise<Result<IFavoriteModel>> {
    var result = await this.requestJson<IFavoriteModel>({
      url: "/api/favorites",
      method: "POST",
      data: model,
    });
    return result;
  }

  public async getAll(param?:ChildrenParams): Promise<Result<IQueryResult<IFavoriteModel>>> {
    const result = await this.requestJson<IQueryResult<IFavoriteModel>>({
      url: `/api/favorites`,
      method: "GET",
      data: param
    });
    return result;
  }
  
  public async search(
    value:IFilterType
  ): Promise<Result<IQueryResult<IFavoriteModel>>> {
    const result = await this.requestJson<IQueryResult<IFavoriteModel>>({
      url: `/api/favorites`,
      method: "GET",
      data:value
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/favorites/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async getFavourite(id: number): Promise<Result<IFavoriteModel>> {
    const res = await this.requestJson<IFavoriteModel>({
      url: `/api/favorites/${id}`,
      method: "GET",
    });
    return res;
  }

}
