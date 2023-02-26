export class ProviderIdentity {
  applicationUserId: string;
  carBackImage: string;
  carFrontImage: string;
  carLicense: string;
  driverLicense: string;
  email: string;
  fullName: string;
  gender: number | string;
  id: number;
  phoneNumber: string;
  profileImage: string;
  registertype: number;
  manufacturingYearId:number;
}

export class ProviderIdentityItem {
  applicationUserId: string;
  createAt: Date
  baseData: {
    email: string;
    phoneNumber: string;
    identificationNumber: string;
    profileImage: string;
    fullName: string;
    userType: number;
    roles: string[];
  };
  carBackImage: string;
  carFrontImage: string;
  carLicense: string;
  driverLicense: string;
  gender: number;
  registertype: number;
  carModelId: number;
}
