import { IPersonalProfileModel } from '@Models/IPersonalProfileModel';
import { IFilterType } from './../models/IFilterType';
import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IChildrenProfileModel } from "@Models/IChildrenProfileModel";
import { RcFile } from "antd/lib/upload";
import { IQueryResult } from "@Models/IQueryResult";
import { string } from "prop-types";

type Params = {
  fullNameOrEmail?: string;
  childrenProfileStatus?: number;
  isNeedToBeAdopted?: string;
  gender?: boolean;
  fromAge?: number;
  toAge?: number;
};

export type ChildrenParams = Params & IFilterType;

export default class ChildrenProfileService extends ServiceBase {
  public async getAll(param?:ChildrenParams): Promise<Result<IQueryResult<IChildrenProfileModel>>> {
    const result = await this.requestJson<IQueryResult<IChildrenProfileModel>>({
      url: `/api/childrenProfiles`,
      method: "GET",
      data: param
    });
    return result;
  }

  public async getChildren(id: number): Promise<Result<IChildrenProfileModel>> {
    const res = await this.requestJson<IChildrenProfileModel>({
      url: `/api/childrenProfiles/${id}`,
      method: "GET",
    });
    return res;
  }

  public async search(
    value:IFilterType
  ): Promise<Result<IQueryResult<IChildrenProfileModel>>> {
    const result = await this.requestJson<IQueryResult<IChildrenProfileModel>>({
      url: `/api/childrenProfiles`,
      method: "GET",
      data:value
    });

    return result;
  }

  
  public async uploadImage(
    id: number,
    file: File
  ): Promise<Result<IChildrenProfileModel>> {
    const data = new FormData();
    data.append("file", file);
    const result = (await this.sendFormData({
      url:  `/api/childrenProfiles/${id}/uploadImage`,
      method: "POST",
      data,
    })) as Result<IChildrenProfileModel>;
    return result;
  }

  public async getImage(id: number): Promise<Result<{}>>  {
    var result = await this.requestJson({
      url:  `/api/childrenProfiles/${id}/getImage`,
      method: "GET",
    });
    if (!result.hasErrors) {
      result.value=`/api/childrenProfiles/${id}/getImage`
    }
    return result;
  }

  public  getImageUrl(id: number): string  {
    return `/api/childrenProfiles/${id}/getImage`;
  }


  public async update(model: IChildrenProfileModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/childrenProfiles/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }
  
  public async updateWithFile(
    model: IChildrenProfileModel,
    file?: RcFile |null,
  ): Promise<Result<{}>> {
    try {
      let result = await this.update(model);
      if (!result.hasErrors) {
        if (file) {
          result = await this.uploadImage(model.id, file);
        }
        return result;
      }

      throw new Error();
    } catch (e) {
      return { hasErrors: true, value: undefined, errors: [] };
    }
  }

  public async addWithFile(
    model: IChildrenProfileModel,
    file: RcFile | null,
  ): Promise<Result<IChildrenProfileModel>> {
    const result = await this.add(model);

    if (!result.hasErrors) {
      if (file) {
        const uploadResult = await this.uploadImage(result.value.id, file);
        return uploadResult;
      }
    }
    return result;
  }
  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/childrenProfiles/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async add(
    model: IChildrenProfileModel
  ): Promise<Result<IChildrenProfileModel>> {
    var result = await this.requestJson<IChildrenProfileModel>({
      url: "/api/childrenProfiles",
      method: "POST",
      data: model,
    });
    return result;
  }
}
