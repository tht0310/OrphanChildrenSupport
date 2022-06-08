export interface ILoginModel {
  login: string;
  password: string;
}

export interface IRegisterModel {
  id?:number
  fullName?: string;
  gender?: boolean;
  dob?: Date;
  phoneNumber?: string;
  email?: string;
  password?: string;
  address?: string;
  confirmPassword?: string;
  refreshToken?:string;
  acceptTerms?: boolean;
  createdBy?: string;
  createdTime?: string | Date | null;
  lastModified?: string | Date | null;
  modifiedBy?: string;
  isDeleted?: boolean;
}

export interface IVerifyModel { 
    token:string | string [];
}
export interface IForgotPasswordModel { 
  email:string ;
}
export interface IResetPasswordModel { 
  password:string ;
  confirmPassword:string ;
  token: string,

}