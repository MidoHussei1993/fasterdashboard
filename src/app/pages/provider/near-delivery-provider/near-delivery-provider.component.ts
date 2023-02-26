import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Marker } from 'src/app/shared/components';
import { SwalModalService } from 'src/app/shared/services/swal-modal.service';
import { DeliveryOrderService } from '../../reports/services/delivery-order.service';
import { ReportsService } from '../../reports/services/reports.service';
import { TransportOrderService } from '../../reports/services/transport-order.service';

@Component({
  selector: 'app-near-delivery-provider',
  templateUrl: './near-delivery-provider.component.html',
  styleUrls: ['./near-delivery-provider.component.scss']
})
export class NearDeliveryProviderComponent implements OnInit {
  @ViewChild('stateModel', { static: false }) stateModel;

  form: FormGroup;
  userform: FormGroup;
  currentLanguage:string = '';
  nearProviderList: any[] = [];
  currentProviderId:string;
  OrderType:string = '';
  locationList:Marker[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,
    private deliveryOrderService:DeliveryOrderService ,
    private transportOrderService: TransportOrderService,
    private swalService: SwalModalService,
    private modalService: NgbModal,
    private reportsService: ReportsService,

  ) {
    this.form = this.formBuilder.group({
      radius: ['', [ Validators.required]],     
    });
    this.userform = this.formBuilder.group({
      price: ['', [ Validators.required]],     
    });
   }

   openModal() {
    this.modalService.open(this.stateModel, {
      backdropClass: 'light-blue-backdrop',
    });
  }
  
  ngOnInit(): void {
    this.OrderType = String(this.activatedRoute.snapshot.queryParams);

  }

  GetNearProviderToDeliveryOrder(){
    this.spinner.show();
    this.deliveryOrderService.GetNearProviderToOrder(this.activatedRoute.snapshot.params.id,this.form.get('radius').value)
    .subscribe(res => {
      this.spinner.hide();
      this.nearProviderList = res.map(item =>{
        item.isBusy = item.isBusy?this.translate.instant('action.yes'):this.translate.instant('action.no');
        return item;
      })
      this.locationList = res.map(item =>{
        return {
          position: {
            lat: +item.providerLatitude,
            lng: +item.providerLongitude,
          },
          icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          label: {
            color: 'blue',
            fontSize:"15px",
            text: item.fullName  + ' || ' +  item.phoneNumber,
          },
          title: String(item.realDistance),
          options: { animation: google.maps.Animation.BOUNCE },
        }
      })

      if (this.activatedRoute.snapshot.queryParams.shopBranchLatitude && this.activatedRoute.snapshot.queryParams.shopBranchLongitude) {
        this.locationList.push({
          position: {
            lat: +this.activatedRoute.snapshot.queryParams.shopBranchLatitude,
            lng: +this.activatedRoute.snapshot.queryParams.shopBranchLongitude,
          },
          label: {
            color: 'red',
            text: this.translate.instant('shop.shop'),
          },
          title: this.translate.instant('shop.shop'),
          options: { animation: google.maps.Animation.BOUNCE },
        })
      }

    },err => {
      this.spinner.hide();
    })
  }

  assignDelivery(){
    this.userform.markAllAsTouched();
    this.spinner.show();
    this.deliveryOrderService.manualAssignment(this.activatedRoute.snapshot.params.id,this.userform.get('price').value,this.currentProviderId)
    .subscribe(res => {
      this.spinner.hide();
      this.modalService.dismissAll();
      this.userform.reset();
      this.notifier.notify('success',this.translate.instant('action.done'))

    },err => {
      this.spinner.hide();
    })
  }



}
