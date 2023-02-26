import { Filter } from "src/app/shared";

export class RewardCompensationFilter extends Filter {
    constructor() {
        super();
        this.StartDate = null;
        this.EndDate = null;
    }
    ActionType:number;
    UserType:number;
    TransactionType:number;
    StartDate:number;
    EndDate:number;
    UserId:number;
    UserPhone:string;
    UserName:string;
}