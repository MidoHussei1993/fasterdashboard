export class MotivationFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.IsActive = null;
    }
    PageNumber: number;
    PageSize: number;
    MotivationType: number;
    IsActive: boolean;
    CreateAtFrom: Date;
    CreateAtTo: Date;
}
