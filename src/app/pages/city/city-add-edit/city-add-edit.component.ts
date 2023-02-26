import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  City,
  CityAdd,
  CityService,
  CountryFilter,
  CountryService,
  Dropdown,
  FormMode,
  List,
  Pattern,
} from 'src/app/shared';
import { Country } from '../../country/country.model';
import { SharedServiceService } from '../../country/SharedService.service';
import { AllCity } from '../city-list/Cities.model';

@Component({
  selector: 'app-city-add-edit',
  templateUrl: './city-add-edit.component.html',
  styleUrls: ['./city-add-edit.component.scss'],
})
export class CityAddEditComponent implements OnInit {
  // main object category
  city: CityAdd = new CityAdd();

  cityList: AllCity = new AllCity();
  hasError: boolean;
  returnUrl: string;

  // check Add or update
  isAdd: boolean;
  // page Title
  title: string;
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  formSubmited;

  Countrylist: Dropdown[] = [];

  isReadonly: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private sharedService: SharedServiceService,
    private spinner: NgxSpinnerService,
    private countryService: CountryService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      cityName: [
        '',
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      cityNameAr: [
        '',
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      countryId: ['', [Validators.required]],
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getcountry();
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getcityByid(this.route.snapshot.params.id);
    }
  }

  // get all country
  getcountry() {
    this.busyLoading = true;
    this.countryService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.busyLoading = false;
        this.Countrylist = res;
      },
      (err) => {
        console.log(err);
        this.busyLoading = false;
      }
    );
  }

  getcityByid(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.cityService.getByID(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.form.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }

  submit() {
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
    this.spinner.show();
    this.cityService.create(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
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
    this.spinner.show();
    this.cityService.update(body).subscribe(
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
