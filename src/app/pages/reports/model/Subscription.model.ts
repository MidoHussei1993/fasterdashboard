
export class Subscription {
  subscriptionsProfitList:IsubscriptionsProfitList[]
  total:number;

}
export interface IsubscriptionsProfitList{
     providerId   : number;
     providerName   :    string ;
     subscriptionProfit   : number;
}



