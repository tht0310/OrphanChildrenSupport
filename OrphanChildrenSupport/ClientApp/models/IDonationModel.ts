import { IChildrenProfileModel } from './IChildrenProfileModel';
import { IEngineEntity } from "./IEngineEntity";

export interface IDonationDetailModel extends IEngineEntity { 
    donationId?: number;
    supportCategoryId: number;
    donationDetailStatus?: number;
    note?: string;
    imagePath?: string;
}
export interface IDonationModel extends IEngineEntity { 
    accountId: number;
    childrenProfileId: number;
    approverId?: number;
    donationStatus?: number;
    note?: string;
    donationDetails: IDonationDetailModel[];
    childrenProfile: IChildrenProfileModel;
    imageId: number
}
  
  