import { Filter } from "./filter.model";

export class CustomerLastLoginFilter extends Filter {
    constructor() {
        super();
        this.LastLoginFrom = null;
        this.LastLoginTo = null;
        this.CustomerId = null;
    }
    CustomerId:number;
    LastLoginFrom:number;
    LastLoginTo:number;
}