export class UserTrackingActionFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.Note = null;
    }
    PageNumber: number;
    PageSize: number;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    StringUserId: string;
    Note: string;
}
