export class SubscriptionFilter{
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.SubscriptionName = null;
        this.SubscriptionNameAr = null;
        this.IsActive = null;
    }
    PageNumber: number;
    PageSize: number;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    SubscriptionName: string;
    SubscriptionNameAr: string;
    IsActive: boolean;
}