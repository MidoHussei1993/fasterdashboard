export class ShopBranchAdd {
  id: number;
  latitude: number;
  longitude: number;
  descriptionLocation: string;
  isActive: boolean;
  shopId: number;
  cityId: number;
  applicationUserId: string;
  createAt: Date;
}

export class ShopBranch {
  id: number;
  shopId: number;
  shopName: string;
  shopNameAr: string;
  shopDescription: string;
  shopDescriptionAr: string;
  type: string;
  typeAr: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  userType: string;
  createAt: Date;
  avatar: string;
  shopTypeId: number;
  applicationUserId: string;
  latitude: number;
  longitude: number;
  descriptionLocation: string;
  descriptionLocationAr: string;
}
