

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
  role?:string;
  jwtToken?:string;
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

export interface ILoginModel { 
  id?:number;
  jwtToken?:string;
  fullName?:string;
  role?:string;
}