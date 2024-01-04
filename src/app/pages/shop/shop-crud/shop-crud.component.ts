import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, Pattern, UserType } from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { ProviderService } from '../../provider/services';
import { ShopTypeService } from '../../shop-type/services';
import { ShopService } from '../services';

@Component({
  selector: 'app-shop-crud',
  templateUrl: './shop-crud.component.html',
  styleUrls: ['./shop-crud.component.scss'],
})
export class ShopCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  imageSrc: string = null;
  shopTypeList: Dropdown[] = [];
  busyLoadingShopType: boolean = false;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  shopId: number = null;
  userTypeDropDown = UserType;

  @ViewChild('imgViewer', { static: false }) imgViewer: ImgViewerComponent;
  bankList: Dropdown[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private shopService: ShopService,
    private shopTypeService: ShopTypeService,
    private translate: TranslateService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,
    private providerService: ProviderService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      shopName: [
        '',
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      shopNameAr: [
        '',
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      shopDescription: [
        '',
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      shopDescriptionAr: [
        '',
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      avatar: ['', Validators.required],
      isPartner: [true, Validators.required],
      isPartnerPostPay: [true, Validators.required],
      percentageFromOrder: [null],
      staticDeliveryAmount: [null],
      email: ['', [Validators.required, Validators.email]],
      // userType: ['', [Validators.required]],
      // avatarName: ['', Validators.required],
      // applicationUserId: 'string',
      shopTypeId: ['', Validators.required],
      identificationNumber: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
      applicationUserId: ['', []],
      commercialRegisterImage: ['', []],
      shopManagerNationalIdImage: ['', []],
      vatCertificateImage: ['', []],
      shopManagerName: ['', []],
      vatNumber: ['', []],
      shopIBAN: ['', []],
      shopBankName: ['', []],
      headerImage: ['', []],
      minimumOrderValue: ['', [Validators.required]],
      maximumOrderValue: ['', [Validators.required]],
      deliverectAccountId: ['', []],
      MinimumCreditOrderValue: [null, [Validators.required]],
      MaximumCreditOrderValue: [null, [Validators.required]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getshopTypeDropdown();
    this.getBankList();
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

  viewImage() {
    this.imgViewer.openBackDropCustomClass();
  }

  getShopById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.shopService.getByID(id).subscribe(
      (shop) => {
        console.log(shop);

        this.spinner.hide();
        let avatarArray = shop.avatar.split('/');
        //  shop.avatar = avatarArray[avatarArray.length - 1];
        //  delete shop.avatar;
        this.form.patchValue(shop);
        this.form.controls.shopTypeId.patchValue(shop.shopTypeId);
        // this.form.pa
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  getshopTypeDropdown() {
    this.busyLoadingShopType = true;
    this.shopTypeService.getDropdown().subscribe(
      (res) => {
        this.busyLoadingShopType = false;
        this.shopTypeList = res;
        if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
          this.shopId = this.route.snapshot.params.id;
          this.getShopById(this.shopId);
        }
      },
      (err) => {
        if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
          this.shopId = this.route.snapshot.params.id;
          this.getShopById(this.shopId);
        }
        this.busyLoadingShopType = false;
      }
    );
  }

  async handleInputChange(event, prop: string) {
    const file = event.target.files[0];
    this.shopService.uploadImage(file).subscribe((res) => {
      this.form.get(prop).patchValue(res.returnData.response);
    });
  }
  submit() {
    console.log(this.form);
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    body.identificationNumber = String(body.identificationNumber);
    body.phoneNumber = String(body.phoneNumber);
    this.spinner.show();
    this.shopService.create(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.spinner.hide();
        this.notifier.notify('success', 'created');
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }
  edit() {
    let body = this.form.value;
    body.identificationNumber = String(body.identificationNumber);
    body.phoneNumber = String(body.phoneNumber);
    this.spinner.show();
    this.shopService.update(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify('success', 'edit');
      },
      (err) => {
        this.notifier.notify('error', err);
        this.spinner.hide();
      }
    );
  }
}
