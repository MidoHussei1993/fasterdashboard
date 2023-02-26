import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode } from 'src/app/shared';
import { OrderStatusService } from 'src/app/shared/services/api/order-status.service';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-delivery-order-crud',
  templateUrl: './delivery-order-crud.component.html',
  styleUrls: ['./delivery-order-crud.component.scss']
})
export class DeliveryOrderCrudComponent implements OnInit {

  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  statusList: Dropdown[] = [];
  currentLanguage:string = '';
 
constructor(
  private router: Router,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder,
  private reportService: ReportsService,
  private notifier: NotifierService,
  private orderStatusService: OrderStatusService,
  private translate: TranslateService,
  private spinner:NgxSpinnerService ,

) {
  this.form = this.formBuilder.group({
    orderId: [this.route.snapshot.params.id],
    newStatusId: ['', [ Validators.required]],
    
  });

  this.mode = this.route.snapshot.data.mode;
  this.currentLanguage = this.translate.currentLang;
  if (this.mode === FormMode.View) {
    // this.isView = true;
    this.form.disable();
  }
}

ngOnInit(): void {
  this.getStatusDropdown();


  if(this.mode == FormMode.Edit || this.mode == FormMode.View){
    this.form.get('newStatusId').patchValue(this.route.snapshot.queryParams.statusId);
  }
}

getDeliveryOrderDetailsDataReport(){
  this.busyLoading = true;
  this.spinner.show();
  this.reportService.DeliveryOrderDetailsDataReport(this.route.snapshot.params.id)
  .subscribe((res:any) => {
    this.spinner.hide();
    this.busyLoading = false;
    this.form.get('newStatusId').patchValue(res.deliveryOrder.statusId);
  },err => {
    this.busyLoading = false;
  })
}

getStatusDropdown():void{
  this.orderStatusService.DeliveryOrderStatusDDL().subscribe(res => {
    this.statusList = res
  },err => {

  })
}



submit() {
  this.form.markAllAsTouched();
  if(!this.form.valid) return;
  // if (this.mode === FormMode.Create) {
  //   this.create();
  // } else {
    this.edit();
  // }
}
// create() {
//   let body = this.form.value;
//   body.phoneNumber = String(body.phoneNumber);
//   body.identificationNumber = String(body.identificationNumber);
//   body.userType = Number(body.userType);
//   this.spinner.show();
//   this.reportService.create(body).subscribe(result => {
//     this.form.reset();
//     this.form.get('id').patchValue(0);
//     this.spinner.hide();
//     this.notifier.notify('success',this.translate.instant('global.created'))
//   },err=>{
//     this.spinner.hide();
//     // this.notifier.notify('error',err)
//   })
// }
edit() {
  let body = this.form.value;
  this.spinner.show();
  this.orderStatusService.UpdateDeliveryOrderStatus(body).subscribe(result => {
    this.spinner.hide();
    this.notifier.notify('success',this.translate.instant('global.edited'))
  },err=>{
    this.spinner.hide();
    // this.notifier.notify('error',err)
  })
}
}
