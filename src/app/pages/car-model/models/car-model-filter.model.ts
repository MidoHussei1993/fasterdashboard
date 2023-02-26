export class CarModelFilter{
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.Name = null;
    }
    PageNumber: number;
    PageSize: number;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    Name: string;
}