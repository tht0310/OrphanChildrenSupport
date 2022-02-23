import { IEngineEntity } from "./IEngineEntity";
export interface IPersonalProfileModel extends IEngineEntity {
  accountName: string;
  fullName: string;
  gender: boolean;
  birthDay: Date;
  address: string;
  mobile: string;
  email: string;
}

export interface IAddPersonProfileModel extends IEngineEntity  {
  accountName: string;
  fullName: string;
  gender: boolean;
  birthDay: Date;
  address: string;
  mobile: string;
  email: string;
}
