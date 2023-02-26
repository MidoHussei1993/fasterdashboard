import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProviderService } from 'src/app/pages/provider/services';

@Component({
  selector: 'app-acceptance-rate',
  templateUrl: './acceptance-rate.component.html',
  styleUrls: ['./acceptance-rate.component.scss']
})
export class AcceptanceRateComponent implements OnInit {

  from:Date;
  to:Date;
  providerOrderRejectPercentage:{name:string,count:number}[] = [];
  providerOrderRejectPercentageChart2:{name:string,count:number}[] = [];
  percentage:any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private providerService: ProviderService,

  ) { }

  ngOnInit(): void {
    // this.getProviderOrderRejectPercentage();
  }

  getProviderOrderRejectPercentage(){
    if(!this.from) return;
    if(!this.to) return;
    this.spinner.show();
    this.providerOrderRejectPercentage = [];
    this.providerOrderRejectPercentageChart2 = [];
    this.providerService.
    GetProviderOrderRejectPercentage({
      providerId: this.activatedRoute.snapshot.params.id,
      startAt: moment(this.from).format('YYYY-MM-DDTHH:mm:ss'),
      endAt: moment(this.to).format('YYYY-MM-DDTHH:mm:ss'),
    })
    .subscribe(res => {
      this.spinner.hide();
      this.percentage = res.returnData.percentage;
      this.providerOrderRejectPercentage=[
        {name: this.translate.instant('field.allOrdersCount') ,count:res.returnData.allOrdersCount},
          {name: this.translate.instant('field.acceptedOrdersCount') ,count:res.returnData.acceptedOrdersCount},
          {name: this.translate.instant('field.rejectOrdersCount') ,count:res.returnData.rejectOrdersCount},
        ]
        this.providerOrderRejectPercentageChart2 = [
          {name: this.translate.instant('field.acceptedPercentage') ,count:res.returnData.acceptedPercentage},
          {name: this.translate.instant('field.rejectedPercentage') ,count:res.returnData.rejectedPercentage},
        ]
      
    },err => {
      this.spinner.hide();
    })
  }

}
