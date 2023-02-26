import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { number } from 'echarts';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarClassService } from 'src/app/pages/car-class/services';
import { CarModelService } from 'src/app/pages/car-model/services';
import { CarNameService } from 'src/app/pages/car-name/services';
import { ManufacturingYearService } from 'src/app/pages/manufacturing-year/services/manufacturing-year.service';
import { ProviderService } from 'src/app/pages/provider/services';
import { VendorService } from 'src/app/pages/vendor/services/vendor.service';
import { CityService, Dropdown, FormMode, SingleItemResponse, UserType } from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { getDate } from 'src/app/util';
import { ProviderIdentityItem } from '../../models';
import { IdentityService } from '../../services/identity.service';
import * as moment from 'moment';
import { SubscriptionService } from 'src/app/pages/subscription/services';
import { ProviderSubscriptionService } from 'src/app/pages/provider-subscription/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-provider-crud',
  templateUrl: './provider-crud.component.html',
  styleUrls: ['./provider-crud.component.scss'],
})
export class ProviderCrudComponent implements OnInit {
  @ViewChild('subscription', { static: false }) subscription;
  @ViewChild('imgViewer', { static: false }) imgViewer: ImgViewerComponent;
  mode: FormMode;
  form: FormGroup;
  mainObject: ProviderIdentityItem | any = new ProviderIdentityItem();
  busyLoading: boolean = false;
  currentLanguage: string = '';
  userTypeDropDown = UserType;
  carNameList: Dropdown[] = [];
  carClassList: Dropdown[] = [];
  carModalList: Dropdown[] = [];
  manufacturingYearList: Dropdown[] = [];
  cityList: Dropdown[] = [];
  providerTypeList: Dropdown[] = [];
  carColorList: Dropdown[] = [];
  nationalityList: Dropdown[] = [];
  venderList: Dropdown[] = [];
  from:Date;
  to:Date;
  viewObject:any = {};
  providerOrderRejectPercentage:{name:string,count:number}[] = [];
  providerOrderRejectPercentageChart2:{name:string,count:number}[] = [];
  currentActiveTab = 0;
  subscriptionList: any[] = [];
  selectedSubscriptionId: number = null;
  bankList: Dropdown[] = [];
  


  constructor(
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private carModelService: CarModelService,
    private carNameService: CarNameService,
    private carClassService: CarClassService,
    private identityService: IdentityService,
    private manufacturingYearService: ManufacturingYearService,
    private cityService: CityService,
    private providerService: ProviderService,
    private vendorService: VendorService,
    private subscriptionService: SubscriptionService,
    private providerSubscriptionService: ProviderSubscriptionService,
    private modalService: NgbModal,

  ) {
    this.form = this.formBuilder.group({
      id: [''],
      carFrontImage: ['', [Validators.required]],
      carBackImage: ['', [Validators.required]],
      driverLicense: ['', [Validators.required]],
      carLicense: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
      profileImage: [null],
      fullName: ['', [Validators.required]],
      // userType: ['', [Validators.required]],
      
      identificationNumber: [''],
      carClassId: [null],
      manufacturingYearId: ['',[Validators.required]],
      carNameId: ['',[Validators.required]],
      carModelId: ['', [Validators.required]],
      password: ['',[Validators.required]],
      email: [null,[Validators.email]],
      plateNumber: [null],
      iqamaImage: [null],
      registertype: ['',[Validators.required]],
      mobileType: [null],
      cityId: [null],
      providerNationalityId: [null],
      carColor: [null],
      venderId: [null],
      bankName: [null],
      iBanNumber: [null],
      stcPayPhoneNumber: [null],
      parentProviderId: [null],
      carInsuranceImage: [null],
    });

  
    let a = {
      "registertype": 1,
      "password": "string",
      "email": "string",
      "carColor": "string",
      "mobileType": "string",
      "cityId": 0,
      "providerNationalityId": 0
    }
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  percentage:any = null;

  
  ngOnInit() {
    if(this.route.snapshot.queryParams.activeTap){
      this.currentActiveTab = 2;
    }
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.removeFormControlsOfCreation();
      // this.form.get('userType').disable();
      this.getProviderData();

     // this.getCarNameList(this.form.get('carModelId').value());
    }
    this.getProviderRigesterTypeDDL();
    this.getVenderList();
    this.getCityList();
    this.getCarColorsList();
    this.getNationality();
    this.getCarModalList();
    this.getCarClassList();
    this.getSubscriptionDDL();
    this.getBankList();
    
    this.getManufacturingYearList();
  }
  getBankList(){
    this.providerService.getBankList().subscribe(
      (res: any) => {
        this.bankList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  removeFormControlsOfCreation(){
    this.form.removeControl('password') // 
    
  }
  getSubscriptionDDL() {
    this.subscriptionService.getSubscriptionDDL().subscribe(
      (res: any) => {
        this.subscriptionList = res.returnData;
      },
      (err) => {}
    );
  }
  selectProviderSubscription() {
    if (!this.selectedSubscriptionId) return;
    this.spinner.show();
    this.providerSubscriptionService
      .create({
        providerId: this.route.snapshot.queryParams.providerId,
        subscriptionId: this.selectedSubscriptionId,
      })
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.notifier.notify(
            'success',
            this.translate.instant('action.done')
          );
          this.modalService.dismissAll();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  getNationality(){
    this.providerService.getNationality().subscribe(
      (res: any) => {
        this.nationalityList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getVenderList(){
    this.vendorService.getDropdown().subscribe(
      (res: any) => {
        this.venderList = [{id:null,name: this.translate.instant('field.cancelContract'),
          nameAr: this.translate.instant('field.cancelContract')},...res];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getProviderRigesterTypeDDL() {
    this.identityService.getProviderRigesterTypeDDL().subscribe(
      (res: any) => {
        this.providerTypeList = res.returnData;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCarColorsList(){
    this.providerService.getCarColors().subscribe((res:Dropdown[]) =>{
      this.carColorList = res;
    }, err =>{
      console.log(err);
    })
  }
  getCityList(){
    this.cityService.getDropdown().subscribe((res:Dropdown[]) =>{
      this.cityList = res;
    }, err =>{
      console.log(err);
    })
  }
  getCarModalList(){
    this.spinner.show();
    this.carModelService.getDropdown().subscribe((res:Dropdown[]) =>{
      this.spinner.hide();
      this.carModalList = res;
    }, err =>{
      this.spinner.hide();
      console.log(err);
    })
  }
  getCarClassList(){
    
    this.carClassService.getDropdown().subscribe((res:Dropdown[]) =>{
      this.carClassList = res;
    }, err =>{
      console.log(err);
    })
  }
  getCarNameList(carModelId){
    console.log(carModelId)
    this.carNameService.getDropdown(carModelId).subscribe((res:Dropdown[]) =>{
      this.carNameList = res;
    }, err =>{
      console.log(err);
    })
  }
  getManufacturingYearList(){
    this.manufacturingYearService.getDropdown().subscribe((res:Dropdown[]) =>{
      this.manufacturingYearList = res;
      
    }, err =>{
      console.log(err);
    })
  }

  viewImage(img) {
    this.imgViewer.img = img;
    this.imgViewer.openBackDropCustomClass();
  }

  getProviderData() {
    this.busyLoading = true;
    this.spinner.show();
    this.identityService
      .getFullProviderProfile(this.route.snapshot.params.id)
      .subscribe(
        (res: SingleItemResponse<ProviderIdentityItem>) => {
          this.spinner.hide();
          this.mainObject = { ...res.returnData, ...res.returnData.baseData };
          this.from = new Date(res.returnData.createAt);
          this.to = new Date();
          // this.getProviderOrderRejectPercentage();
          this.busyLoading = false;
          this.form.patchValue(this.mainObject);
          this.viewObject = res.returnData;
          if(res.returnData.carModelId){
            this.getCarNameList(res.returnData.carModelId);
          }
        },
        (err) => {
          this.spinner.show();
          this.busyLoading = false;
        }
      );
  }
  async handleInputChange(event, prop: string) {
    const file = event.target.files[0];
    this.identityService.uploadImage(file).subscribe((res) => {
      this.mainObject[prop] = res.returnData.response;
      this.form.get(prop).patchValue(res.returnData.response);
    });
  }
  submit() {
    this.form.markAllAsTouched();
    console.log(this.form.controls.phoneNumber)
    if(!this.form.valid) return;
    
    console.log(this.form)
    if (this.mode === FormMode.Create) {
      this.create();
    }else{
      this.edit()
    }
  }
  create() {
    let body = this.form.value;
    body.registertype = +body.registertype;
    body.manufacturingYearId = +body.manufacturingYearId;
    body.carModelId = +body.carModelId;
    body.manufacturingYearId = +body.manufacturingYearId;
    if(body.carClassId){
      body.carClassId = +body.carClassId;
    }
    if(body.cityId){
      body.cityId = +body.cityId;
    }
    if(body.providerNationalityId){
      body.providerNationalityId = +body.providerNationalityId;
    }
    if(body.venderId){
      body.venderId = +body.venderId;
    }
    body.carNameId = +body.carNameId;
    this.spinner.show();
    this.identityService.createProvider(body).subscribe(result => {
      this.form.reset();
      this.form.get('id').patchValue(0);
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.created'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }

  edit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    let body = this.form.value;
    body.registertype = +body.registertype;
    body.carModelId = +body.carModelId;
    body.manufacturingYearId = +body.manufacturingYearId;
    if(body.carClassId){
      body.carClassId = +body.carClassId;
    }
    if(body.cityId){
      body.cityId = +body.cityId;
    }
    if(body.providerNationalityId){
      body.providerNationalityId = +body.providerNationalityId;
    }
    if(body.venderId){
      body.venderId = +body.venderId;
    }
    body.carNameId = +body.carNameId;
    this.spinner.show();
    this.identityService
      .updateProvider(this.route.snapshot.params.id, body)
      .subscribe(
        (result) => {
          this.spinner.hide();
          this.notifier.notify(
            'success',
            this.translate.instant('global.edited')
          );
        },
        (err) => {
          this.spinner.hide();
          // this.notifier.notify('error',err)
        }
      );
  }

  changeActivation() {
    this.spinner.show();
    this.identityService
      .changeUserActivate(this.route.snapshot.params.id)
      .subscribe(
        (res) => {
          this.spinner.hide();
          // this.getProviderList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  approveProvider() {
    this.spinner.show();
    this.identityService
      .approveProvider(String(this.mainObject.id))
      .subscribe(
        (res) => {
          this.spinner.hide();
          // this.getProviderList();
        },
        (err) => {
          this.spinner.hide();
        }
      );
  }
  

  // getProviderOrderRejectPercentage(){
  //   if(!this.from) return;
  //   if(!this.to) return;
  //   this.spinner.show();
  //   this.providerOrderRejectPercentage = [];
  //   this.providerOrderRejectPercentageChart2 = [];
  //   this.providerService.
  //   GetProviderOrderRejectPercentage({
  //     providerId: this.mainObject.id,
  //     startAt: moment(this.from).format('YYYY-MM-DDTHH:mm:ss'),
  //     endAt: moment(this.to).format('YYYY-MM-DDTHH:mm:ss'),
  //   })
  //   .subscribe(res => {
  //     this.spinner.hide();
  //     this.percentage = res.returnData.percentage;
  //     this.providerOrderRejectPercentage=[
  //       {name: this.translate.instant('field.allOrdersCount') ,count:res.returnData.allOrdersCount},
  //         {name: this.translate.instant('field.acceptedOrdersCount') ,count:res.returnData.acceptedOrdersCount},
  //         {name: this.translate.instant('field.rejectOrdersCount') ,count:res.returnData.rejectOrdersCount},
  //       ]
  //       this.providerOrderRejectPercentageChart2 = [
  //         {name: this.translate.instant('field.acceptedPercentage') ,count:res.returnData.acceptedPercentage},
  //         {name: this.translate.instant('field.rejectedPercentage') ,count:res.returnData.rejectedPercentage},
  //       ]
      
  //   },err => {
  //     this.spinner.hide();
  //   })
  // }

  openSubscriptionModal(){
    this.modalService.open(this.subscription, {
      backdropClass: 'light-blue-backdrop',
    });
  }
}
