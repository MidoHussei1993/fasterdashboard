import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  CityService,
  CountryService,
  Dropdown,
  FormMode,
  Pattern,
  UserType,
} from 'src/app/shared';
import { ShopService } from '../../shop/services';
import { ShopBranchService } from '../services';
import jwt_decode from 'jwt-decode';
import { Roles } from 'src/app/shared/models/roles.model';

@Component({
  selector: 'app-shop-branch-crud',
  templateUrl: './shop-branch-crud.component.html',
  styleUrls: ['./shop-branch-crud.component.scss'],
})
export class ShopBranchCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  cityList: Dropdown[] = [];
  shopList: Dropdown[] = [];
  currentLanguage: string = '';
  shopBranchId: number = null;
  locationList: google.maps.LatLngLiteral[] = [];
  userTypeDropDown = UserType;
  applicationUserId;
  shopName: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private shopBranchService: ShopBranchService,
    private notifier: NotifierService,
    private cityService: CityService,
    private shopService: ShopService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      descriptionLocation: [
        '',
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      descriptionLocationAr: [
        '',
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      isActive: ['', [Validators.required]],
      shopId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phoneNumber: ['', [Validators.minLength(12), Validators.maxLength(12)]],
      userType: [1],
      identificationNumber: [''],
      deliverectChannelId: [''],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getCityDropdown();
    this.getShopDropdown();

    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.shopBranchId = this.route.snapshot.params.id;
      this.getShopBranchById(this.shopBranchId);
    }
  }

  getShopBranchById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.shopBranchService.getByID(id).subscribe(
      (shobBranch: any) => {
        this.spinner.hide();
        this.applicationUserId = shobBranch.applicationUserId;
        shobBranch.phoneNumber = +shobBranch.phoneNumber;
        console.log(shobBranch);
        console.log(this.applicationUserId);

        this.busyLoading = false;
        this.form.patchValue(shobBranch);
        this.locationList[0] = {
          lat: shobBranch.latitude,
          lng: shobBranch.longitude,
        };
      },
      (err) => {
        this.busyLoading = false;
      }
    );
  }

  getCityDropdown(): void {
    this.cityService.getDropdown().subscribe(
      (res) => {
        this.cityList = res;
      },
      (err) => {}
    );
  }

  getShopDropdown(): void {
    this.shopService.getDropdown().subscribe(
      (res) => {
        this.shopList = res;
      },
      (err) => {}
    );
  }

  setMarkerLocation(propName: string) {
    if (propName == 'latitude') {
      this.locationList[0].lat = this.form.get('latitude').value;
    } else {
      this.locationList[0].lng = this.form.get('longitude').value;
    }
  }

  setLocation(location: { lat: number; lng: number }): void {
    this.locationList[0] = { lat: location.lat, lng: location.lng };
    console.log(location);
    this.form.controls.latitude.patchValue(location.lat);
    this.form.controls.longitude.patchValue(location.lng);
  }

  getBranchesByGoogle() {
    if (!this.shopName.length) return;
    this.spinner.show();
    this.shopBranchService.getBranchesByGoogle(this.shopName).subscribe(
      (res) => {
        this.spinner.hide();
        this.locationList = res.results.map((item) => {
          return item.geometry.location;
        });
        console.log(res);
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  submit() {
    this.form.markAllAsTouched();
    console.log(this.form);
    if (!this.form.valid) return;
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    body.phoneNumber = String(body.phoneNumber);
    body.identificationNumber = String(body.identificationNumber);
    body.userType = Number(body.userType);
    this.spinner.show();
    this.shopBranchService.create(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.form.get('userType').patchValue(1);
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
  edit() {
    let body = this.form.value;
    body.phoneNumber = String(body.phoneNumber);
    body.identificationNumber = String(body.identificationNumber);
    body.userType = Number(body.userType);
    body.applicationUserId = this.applicationUserId;
    this.spinner.show();
    this.shopBranchService.update(body).subscribe(
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
}
