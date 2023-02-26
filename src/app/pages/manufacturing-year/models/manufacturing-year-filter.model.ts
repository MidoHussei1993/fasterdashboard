export class ManufacturingYearFilter{
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.Year = null;
    }
    PageNumber: number;
    PageSize: number;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    Year: string;
}