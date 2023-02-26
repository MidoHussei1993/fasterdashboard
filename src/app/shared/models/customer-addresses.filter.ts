import { Filter } from "./filter.model";

export class CustomerAaddresses extends Filter {
    constructor() {
        super();
        this.ApplicationUserId = null;
    }
    ApplicationUserId:string;
}