export class CarNameFilter{
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.Name = null;
    }
    PageNumber: number;
    PageSize: number;
    CarModelId: number;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    Name: string;
}