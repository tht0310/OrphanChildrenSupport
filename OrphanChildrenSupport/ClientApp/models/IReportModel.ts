import { IChildrenProfileModel } from "./IChildrenProfileModel";
import { IEngineEntity } from "./IEngineEntity";

export interface IReportDetailModel extends IEngineEntity { 
    reportId?: number;
    reportFieldCategoryId: number;
    approverId?: number;
    reportInformation:string;
    note?: string;
    reportDetailStatus?: number;
}
export interface IReportModel extends IEngineEntity { 
    accountId: number;
    childrenProfileId: number;
    approverId?: number;
    reportStatus?: number;
    note?: string;
    reportDetails: IReportDetailModel[];
    childrenProfile: IChildrenProfileModel;
    imageId: number
}

  
  