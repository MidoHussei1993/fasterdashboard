import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Dropdown, FormMode } from 'src/app/shared';
import { CoboneService } from '../services';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { ShopService } from '../../shop/services';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cobone-crud',
  templateUrl: './cobone-crud.component.html',
  styleUrls: ['./cobone-crud.component.scss'],
})
export class CoboneCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  shopList: Dropdown[] = [];
  coboneTypeList: Dropdown[] = [];
  currentLanguage: string = '';
  a = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private coboneService: CoboneService,
    private notifier: NotifierService,
    private shopService: ShopService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      coboneCode: ['', [Validators.required]],
      expiryDate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      shopId: [''],
      isActive: ['', [Validators.required]],
      limitation: ['', [Validators.required]],
      numberOfUse: [1, [Validators.required, Validators.min(1)]],
      note: [''],
      coboneType: [''],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getShopDropdown();
    this.getCoboneType();
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getCoboneId(this.route.snapshot.params.id);
    }
  }

  getCoboneId(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.coboneService.getByID(id).subscribe(
      (cobone) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.form.patchValue(cobone);
        // var dateObj = new Date(cobone.expiryDate);
        // let month = dateObj.getUTCMonth() + 1;
        // let day = dateObj.getUTCDate();
        // let year = dateObj.getUTCFullYear();
        // let newdate = year + "-" + month + "-" + day;
        // this.form.get('expiryDate').patchValue(newdate)
        // console.log(this.form.get('expiryDate').value)
        this.form.get('expiryDate').patchValue(new Date(cobone.expiryDate));
      },
      (err) => {
        this.busyLoading = false;
      }
    );
  }

  getShopDropdown(): void {
    this.shopService
      .getDropdown()
      .pipe(
        map((res: any[]) => {
          return [{ id: null, name: 'All Shop', nameAr: 'كل المتاجر' }, ...res];
        })
      )
      .subscribe(
        (res) => {
          this.shopList = res;
        },
        (err) => {}
      );
  }

  getCoboneType(): void {
    this.coboneService.GetCoboneTypeDDL().subscribe(
      (res) => {
        this.coboneTypeList = res;
      },
      (err) => {}
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
    body.coboneType = +body.coboneType;
    body.expiryDate = moment(body.expiryDate).format('YYYY-MM-DD');
    this.spinner.show();
    this.coboneService.create(body).subscribe(
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
    body.coboneType = +body.coboneType;
    this.spinner.show();
    this.coboneService.update(body).subscribe(
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
