export class CustomerOrderStatusReportFilter{
    constructor() {
        this.CustomerId = null;
        this.StartDate = null;
        this.EndDate = null;
    }
    PageNumber: number;
    PageSize: number;
    CustomerId: number;
    TypeId: number;
    StatusId: number;
    StartDate: string;
    EndDate: string;
}