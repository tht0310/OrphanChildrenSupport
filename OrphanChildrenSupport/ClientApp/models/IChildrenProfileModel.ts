
export interface IChildrenProfileModel{
        id: number;
        firstName: string,
        lastName: string,
        middleName: string,
        fullName: string,
        description:string,
        gender: boolean,
        dob: Date | null,
        address: string,
        phoneNumber: string,
        status: string,
        isNeedToBeAdopted: boolean,
        createdBy: string;
        createdTime: Date ;
        lastModified: Date;
        modifiedBy: string;
        isDeleted: boolean;
}

