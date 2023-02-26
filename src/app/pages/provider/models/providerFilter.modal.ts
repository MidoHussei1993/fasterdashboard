export class ProviderFilter {
  constructor() {
    this.CreateAtFrom = null;
    this.CreateAtFrom = null;
    this.CreateAtTo = null;
    this.Gender = null;
    this.ProviderId = null;
    // this.Registertype=null;
    this.IsActive = null;
    // this.Statues=null;
    this.ProviderFullName = null;
    this.IdentificationNumber = null;
    this.phoneNumber = null;
    this.parentProviderId = null;
    // this.VendorId=null;
  }
  PageNumber: number;
  PageSize: number;
  CreateAtFrom: Date;
  CreateAtTo: Date;
  Gender: number;
  Registertype: number;
  IsActive: any;
  Statues: any;
  ProviderFullName: string;
  IdentificationNumber: string;
  ProviderId: string;
  phoneNumber: string;
  VendorId: number;
  NationalityId: number;
  CityId: number;
  parentProviderId: string;
}
