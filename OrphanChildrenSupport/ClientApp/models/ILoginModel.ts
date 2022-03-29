export interface ILoginModel {
  login: string;
  password: string;
}

export interface IRegisterModel {
  fullName?: string;
  gender?: boolean;
  dob?: Date;
  phoneNumber?: string;
  email?: string;
  password?: string;
  detailAddress?: string;
  publicAddress?: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
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