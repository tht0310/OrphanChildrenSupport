export interface IReportChildrenInformationModel {
    fullName: string,
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
}