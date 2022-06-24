import { IChildrenProfileModel } from './IChildrenProfileModel';
import { IEngineEntity } from "./IEngineEntity";

export interface IDonationDetailModel extends IEngineEntity { 
    donationId?: number;
    supportCategoryId: number;
    status?: number;
    note?: string;
    imagePath?: string;
    accountName?: string;
}
export interface IDonationModel extends IEngineEntity { 
    accountId: number;
    childrenProfileId: number;
    approverId?: number;
    status?: number;
    note?: string;
    donationDetails: IDonationDetailModel[];
    childrenProfile: IChildrenProfileModel;
    imageId: number
}
  
  