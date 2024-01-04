import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarClassService } from 'src/app/pages/car-class/services';
import { CarModelService } from 'src/app/pages/car-model/services';
import { CarNameService } from 'src/app/pages/car-name/services';
import { ProviderIdentityItem } from 'src/app/pages/identity/models';
import { IdentityService } from 'src/app/pages/identity/services/identity.service';
import { ManufacturingYearService } from 'src/app/pages/manufacturing-year/services/manufacturing-year.service';
import { ProviderSubscriptionService } from 'src/app/pages/provider-subscription/services';
import { ProviderService } from 'src/app/pages/provider/services';
import { SubscriptionService } from 'src/app/pages/subscription/services';
import { VendorService } from 'src/app/pages/vendor/services/vendor.service';
import {
  FormMode,
  UserType,
  CityService,
  SingleItemResponse,
  Dropdown,
  Pattern,
} from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss'],
})
export class CreateProviderComponent implements OnInit {
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
  from: Date;
  to: Date;
  viewObject: any = {};
  providerOrderRejectPercentage: { name: string; count: number }[] = [];
  providerOrderRejectPercentageChart2: { name: string; count: number }[] = [];
  currentActiveTab = 0;
  subscriptionList: any[] = [];
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
    private modalService: NgbModal
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      carFrontImage: ['', [Validators.required]],
      carBackImage: ['', [Validators.required]],
      driverLicense: ['', [Validators.required]],
      carLicense: ['', [Validators.required]],
      gender: [null],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(Pattern.saudiMobileNumbers)],
      ],
      profileImage: [null],
      fullName: ['', [Validators.required]],
      // userType: ['', [Validators.required]],

      identificationNumber: [
        '',
        [Validators.pattern(Pattern.startWithOneOrTwo)],
      ],
      carClassId: [null],
      manufacturingYearId: ['', [Validators.required]],
      carNameId: ['', [Validators.required]],
      carModelId: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: [null, [Validators.email]],
      plateNumber: [null],
      iqamaImage: [null, [Validators.required]],
      registertype: [null],
      mobileType: [null],
      cityId: [null],
      providerNationalityId: [null],
      carColor: [null],
      venderId: [null],
      refrealCode: [null],
      bankName: [null],
      iBanNumber: [null],
      stcPayPhoneNumber: [null],
      carInsuranceImage: [null],
      driverDateOfBirth: [''],
    });

    let a = {
      registertype: 1,
      password: 'string',
      email: 'string',
      carColor: 'string',
      mobileType: 'string',
      cityId: 0,
      providerNationalityId: 0,
    };
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  percentage: any = null;

  ngOnInit() {
    if (this.route.snapshot.queryParams.activeTap) {
      this.currentActiveTab = 2;
    }
    if (this.route.snapshot.queryParams.vendorId) {
      this.form
        .get('venderId')
        .patchValue(this.route.snapshot.queryParams.vendorId);
    }

    this.getProviderRigesterTypeDDL();
    // this.getVenderList();
    this.getCityList();
    this.getCarColorsList();
    this.getNationality();
    this.getCarModalList();
    this.getCarClassList();
    this.getManufacturingYearList();
    this.getBankList();

    if (this.route.snapshot.queryParams.referralCode) {
      this.form
        .get('refrealCode')
        .patchValue(this.route.snapshot.queryParams.referralCode);
    }
  }

  getBankList() {
    this.providerService.getBankList().subscribe(
      (res: any) => {
        this.bankList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeFormControlsOfCreation() {
    this.form.removeControl('password'); //
  }

  getNationality() {
    this.providerService.getNationality().subscribe(
      (res: any) => {
        this.nationalityList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getVenderList() {
    this.vendorService.getDropdown().subscribe(
      (res: any) => {
        this.venderList = res;
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
  getCarColorsList() {
    this.providerService.getCarColors().subscribe(
      (res: Dropdown[]) => {
        this.carColorList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCityList() {
    this.cityService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.cityList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCarModalList() {
    this.spinner.show();
    this.carModelService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.spinner.hide();
        this.carModalList = res;
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  getCarClassList() {
    this.carClassService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.carClassList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getCarNameList() {
    console.log(this.form.get('carModelId').value);
    this.carNameService
      .getDropdown(this.form.get('carModelId').value)
      .subscribe(
        (res: Dropdown[]) => {
          this.carNameList = res;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getManufacturingYearList() {
    this.manufacturingYearService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.manufacturingYearList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewImage(img) {
    this.imgViewer.img = img;
    this.imgViewer.openBackDropCustomClass();
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
    if (!this.form.valid) return;
    if (
      this.form.controls.phoneNumber.value !=
      this.form.controls.stcPayPhoneNumber.value
    ) {
      this.notifier.notify('error', this.translate.instant('_.phoneSTC'));
      return;
    }
    if (this.mode === FormMode.Create) {
      this.create();
    }
  }
  create() {
    let body = this.form.value;
    body.registertype = +body.registertype;
    body.manufacturingYearId = +body.manufacturingYearId;
    body.carModelId = +body.carModelId;
    body.manufacturingYearId = +body.manufacturingYearId;
    if (body.carClassId) {
      body.carClassId = +body.carClassId;
    }
    if (body.cityId) {
      body.cityId = +body.cityId;
    }
    if (body.providerNationalityId) {
      body.providerNationalityId = +body.providerNationalityId;
    }
    if (body.venderId) {
      body.venderId = +body.venderId;
    }
    body.carNameId = +body.carNameId;
    this.spinner.show();
    this.identityService.createProviderForPublic(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        if (this.route.snapshot.queryParams.refrealCode) {
          this.form
            .get('refrealCode')
            .patchValue(this.route.snapshot.queryParams.referralCode);
        }
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }

  approveProvider() {
    this.spinner.show();
    this.identityService.approveProvider(String(this.mainObject.id)).subscribe(
      (res) => {
        this.spinner.hide();
        // this.getProviderList();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
