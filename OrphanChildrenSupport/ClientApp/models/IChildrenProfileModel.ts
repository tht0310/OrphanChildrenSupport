import { IChildrenSupportCategoryModel } from './IChildrenSupportCategoryModel';
import { IEngineEntity } from "./IEngineEntity";

export interface IChildrenProfileModel extends IEngineEntity {
        fullName: string,
        description:string,
        gender: boolean,
        dob: Date | null,
        address: string,
        guardianPhoneNumber?: string,
        guardianName?: string,
        status: string,
        detailAddress:string,
        publicAddress: string,
        circumstance: string,
        imagePath: string,
        city?:string,
        province?:string,
        houseNumber?:string
        childrenSupportCategories?:IChildrenSupportCategoryModel[]
}

