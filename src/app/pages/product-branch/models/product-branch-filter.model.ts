export class ProductBranchFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.ShopBranchId = null;
        this.ProductId = null;
    }
    PageNumber: number;
    PageSize: number;
    IsActive: boolean;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    ShopBranchId: string;
    ProductId: string;
}
