export class BannerFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.Description = null;
        this.DescriptionAr = null;
        this.IsActive = null;
    }
    PageNumber: number;
    PageSize: number;
    IsActive: boolean;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    Description: string;
    DescriptionAr: string;
    ShopId:number
}
