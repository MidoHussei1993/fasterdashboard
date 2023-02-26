import { Filter } from "src/app/shared";

export class ShopBranchWalletFilter extends Filter{
    constructor() {
        super()
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.ShopBranchId = null;
    }
    ShopBranchId:number;
    Type:number;
}