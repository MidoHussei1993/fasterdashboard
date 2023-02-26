export class ApproveWalletFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.Type = null;
    }
    PageNumber: number;
    PageSize: number;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    Type: number;
}
