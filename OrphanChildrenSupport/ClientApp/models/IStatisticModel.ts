export interface IReportStatisticModel {
    status: string;
    percentage: number;
}
export interface IDonationStatisticModel {
    status: string;
    percentage: number;
}
export interface ITopDonationUserModel {
    fullName: string;
    email:string;
    value:number
}
export interface IDonationTimesModel {
    month:number;
    value:number
}