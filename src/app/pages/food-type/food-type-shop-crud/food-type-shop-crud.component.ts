import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, FormMode } from 'src/app/shared';
import { ShopService } from '../../shop/services';
import { FoodTypeShopService } from '../services/food-type-shop.service';
import { FoodTypeService } from '../services/food-type.service';

@Component({
  selector: 'app-food-type-shop-crud',
  templateUrl: './food-type-shop-crud.component.html',
  styleUrls: ['./food-type-shop-crud.component.scss'],
})
export class FoodTypeShopCrudComponent extends Crud implements OnInit {
  foodTypeList = [];
  shopList = [];
  isShopId: boolean = false;

  constructor(
    private foodTypeService: FoodTypeService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    private shopService: ShopService,
    private foodTypeShopService: FoodTypeShopService
  ) {
    super(foodTypeService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      shopId: ['', [Validators.required]],
      foodTypeId: ['', [Validators.required]],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    this.isShopId = this.route.snapshot.queryParamMap.get('shopId')
      ? true
      : false;
    if (this.isShopId) {
      this.form
        .get('shopId')
        .patchValue(this.route.snapshot.queryParamMap.get('shopId'));
    }
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getById(this.route.snapshot.params.id);
    }
    this.getShopDropdown();
    this.getFoodTypeDropdown();
  }

  getFoodTypeDropdown() {
    this.spinner.show();
    this.foodTypeService.getDropdown().subscribe(
      (result) => {
        this.spinner.hide();
        this.foodTypeList = result;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  getShopDropdown() {
    this.spinner.show();
    this.shopService.getDropdown().subscribe(
      (result) => {
        this.spinner.hide();
        this.shopList = result;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  create() {
    let body = this.form.value;
    this.spinner.show();
    this.foodTypeShopService.create(body).subscribe(
      (result) => {
        this.spinner.hide();
        this.notifier.notify('success', this.translate.instant('created'));
        this.getShopDropdown();
        this.getFoodTypeDropdown();
        // this.form.reset();
        // this.form.get('id').patchValue(0);
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
}
