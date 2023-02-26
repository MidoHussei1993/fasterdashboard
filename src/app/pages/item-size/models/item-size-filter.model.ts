export class ItemSizeFilter{
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.SizeName = null;
        this.SizeNameAr = null;
    }
    PageNumber: number;
    PageSize: number;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    SizeName: string;
    SizeNameAr: string;
}