import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { ItemSizeService } from 'src/app/pages/item-size/services/item-size.service';
import { Dropdown, FormMode, Pattern } from 'src/app/shared';
import { ProductDetailsSizeService } from '../services';

@Component({
  selector: 'app-product-details-size-crud',
  templateUrl: './product-details-size-crud.component.html',
  styleUrls: ['./product-details-size-crud.component.scss'],
})
export class ProductDetailsSizeCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  itemSizeList: Dropdown[] = [];
  busyLoadingItemSizeDropdown: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productDetailsSizeService: ProductDetailsSizeService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private itemSizeService: ItemSizeService
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      price: ['', [Validators.required]],
      lastPrice: ['', [Validators.required]],
      itemSizeId: ['', [Validators.required]],
      productDetailsId: [
        this.activatedRoute.snapshot.params.detailsId,
        [Validators.required],
      ],
      isActive:true,
      deliverectPLU: [''],

    });

    this.mode = this.activatedRoute.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.getItemSizeDropDown();
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getFaqsById(this.activatedRoute.snapshot.params.id);
    }
  }
  getItemSizeDropDown() {
    this.busyLoadingItemSizeDropdown = true;
    this.itemSizeService.getDropdown().subscribe(
      (res: Dropdown[]) => {
        this.busyLoadingItemSizeDropdown = false;
        this.itemSizeList = res;
      },
      (err) => {
        console.log(err);
        this.busyLoadingItemSizeDropdown = false;
      }
    );
  }

  getFaqsById(id: number) {
    this.busyLoading = true;
    this.spinner.show();
    this.productDetailsSizeService.getByID(id).subscribe(
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
    console.log(this.form);
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.productDetailsSizeService.create(body).subscribe(
      (result) => {
        this.form.reset();
        this.form.get('id').patchValue(0);
        this.form.get('productDetailsId').patchValue(this.activatedRoute.snapshot.params.detailsId);
        this.form.get('isActive').patchValue(true);
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify('error', err);
      }
    );
  }
  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.productDetailsSizeService.update(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.edited')
        );
      },
      (err) => {
        this.spinner.hide();
        this.notifier.notify('error', err);
      }
    );
  }
}
