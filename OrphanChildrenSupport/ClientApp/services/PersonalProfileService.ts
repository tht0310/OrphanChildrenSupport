import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IPersonalProfileModel } from "@Models/IPersonalProfileModel";
import { IQueryResult } from "@Models/IQueryResult";

export default class PersonalProfileService extends ServiceBase {
  public async getAll(): Promise<Result<IQueryResult<IPersonalProfileModel>>> {
    const result = await this.requestJson<IQueryResult<IPersonalProfileModel>>({
      url: `/api/personalProfiles`,
      method: "GET",
    });
    return result;
  }

  public async search(): Promise<Result<IQueryResult<IPersonalProfileModel>>> {
    const result = await this.requestJson<IQueryResult<IPersonalProfileModel>>({
      url: `/api/personalProfiles`,
      method: "GET",
    });
    console.log(result);
    return result;
  }

  public async update(model: IPersonalProfileModel): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/personalProfiles/${model.id}`,
      method: "PUT",
      data: model,
    });
    return result;
  }

  public async delete(id: number): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/personalProfiles/${id}`,
      method: "DELETE",
    });
    return result;
  }

  public async add(model: IPersonalProfileModel): Promise<Result<number>> {
    var result = await this.requestJson<number>({
      url: "/api/personalProfiles/Add",
      method: "POST",
      data: model,
    });
    return result;
  }
}
