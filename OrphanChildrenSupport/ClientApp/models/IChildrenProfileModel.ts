import { IChildrenSupportCategoryModel } from "./IChildrenSupportCategoryModel";
import { IEngineEntity } from "./IEngineEntity";

export interface IChildrenProfileModel extends IEngineEntity {
  fullName: string;
  gender: boolean;
  dob: Date | null;
  age: number;
  address: string;
  guardianPhoneNumber?: string;
  guardianName?: string;
  status: string | number;
  detailAddress: string;
  publicAddress: string;
  circumstance: string;
  imagePath: string;
  imageId?: number;
  city?: string;
  province?: string;
  houseNumber?: string;
  childrenProfileSupportCategories?: IChildrenSupportCategoryModel[];
}

export interface IChildrenImage extends IEngineEntity {
  childrenProfileId: number;
  imagePath: string;
}
