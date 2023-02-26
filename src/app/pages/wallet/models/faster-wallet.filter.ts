import { Filter } from "src/app/shared";

export class FasterWalletFilter extends Filter{
    constructor() {
        super()
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
    }
    Type:number;
}