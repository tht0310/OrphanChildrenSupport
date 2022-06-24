import {
  IDonationTimesModel,
  ITopDonationUserModel,
} from "./../models/IStatisticModel";

import Result from "@Core/Result";
import { ServiceBase } from "@Core/ServiceBase";
import { IQueryResult } from "@Models/IQueryResult";
import { IReportStatisticModel } from "@Models/IStatisticModel";

export default class StatisticService extends ServiceBase {
  public async getStatisticDonation(): Promise<
    Result<IQueryResult<IReportStatisticModel>>
  > {
    const result = await this.requestJson<IQueryResult<IReportStatisticModel>>({
      url: `/api/donations/getStatistics`,
      method: "GET",
    });
    return result;
  }

  public async getStatisticReport(): Promise<
    Result<IQueryResult<IReportStatisticModel>>
  > {
    const result = await this.requestJson<IQueryResult<IReportStatisticModel>>({
      url: `/api/reports/getStatistics`,
      method: "GET",
    });
    return result;
  }

  public async getTopDonations(
    limit: number
  ): Promise<Result<IQueryResult<ITopDonationUserModel>>> {
    const result = await this.requestJson<IQueryResult<ITopDonationUserModel>>({
      url: `/api/accounts/getTopDonationUsers/${limit}`,
      method: "GET",
    });
    return result;
  }

  public async getDonationsTime(
    year: number
  ): Promise<Result<IDonationTimesModel[]>> {
    const result = await this.requestJson<IDonationTimesModel[]>({
      url: `/api/childrenProfiles/getSupportedChildrenStatistics/${year}`,
      method: "GET",
    });
    return result;
  }
}
