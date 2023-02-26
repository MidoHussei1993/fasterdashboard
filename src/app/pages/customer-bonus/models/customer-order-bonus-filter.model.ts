export class CustomerOrderBounsFilter{
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.IsActive = null;
    }
    PageNumber: number;
    PageSize: number;
    IsActive: boolean;
    CreateAtFrom: Date;
    CreateAtTo: Date;
}