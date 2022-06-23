
import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IDonationDetailModel } from "@Models/IDonationModel";
import { IFilterType } from "@Models/IFilterType";
import { IQueryResult } from "@Models/IQueryResult";
import { RcFile } from "antd/lib/upload";


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

  public async getdonation(id: number): Promise<Result<IQueryResult<IDonationDetailModel>>> {
    const res = await this.requestJson<IQueryResult<IDonationDetailModel>>({
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

  public async uploadImage(
    id: number,
    file: File
  ): Promise<Result<IDonationDetailModel>> {
    const data = new FormData();
    data.append("files", file);
    const result = (await this.sendFormData({
      url:  `/api/donationDetails/${id}/uploadImage`,
      method: "POST",
      data,
    })) as Result<IDonationDetailModel>;
    console.log(result)
    return result;
  }

  public async getImage(id: number): Promise<Result<{}>>  {
    var result = await this.requestJson({
      url:  `/api/donationDetails/viewImage/${id}`,
      method: "GET",
    });
    if (!result.hasErrors) {
      result.value=`/api/donationDetails/viewImage/${id}`
    }
    return result;
  }

  public  getImageUrl(id: number): string  {
    return `/api/donationDetails/viewImage/${id}`;
  }

  public async updateWithFile(
    model: IDonationDetailModel,
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

  public async cancelDonationDetail(id): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/donationDetails/cancel/${id}`,
      method: "PUT",
    });
    return result;
  }



  public async approveDonationDetail(id): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/donationDetails/finish/${id}`,
      method: "PUT",
    });
    return result;
  }


  public async rejectDonationDetail(id): Promise<Result<{}>> {
    var result = await this.requestJson({
      url: `/api/donationDetails/reject/${id}`,
      method: "PUT",
    });
    return result;
  }

}
