export interface ILoginModel {
  login: string;
  password: string;
  rememberMe?: boolean;
}

export interface IRegisterModel {
  fullName: string;
  gender: boolean;
  dob: Date;
  phoneNumber: string;
  email: string;
  password: string;
  detailAddress: string;
  publicAddress: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}
