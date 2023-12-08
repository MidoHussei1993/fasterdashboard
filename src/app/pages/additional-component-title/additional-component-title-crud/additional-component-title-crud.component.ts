import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, FormMode, Pattern } from 'src/app/shared';
import { clean } from 'src/app/util';
import { ProductService } from '../../product/services';
import { AdditionalComponentTitleService } from '../services/additional-component-title.service';

@Component({
  selector: 'app-additional-component-title-crud',
  templateUrl: './additional-component-title-crud.component.html',
  styleUrls: ['./additional-component-title-crud.component.scss'],
})
export class AdditionalComponentTitleCrudComponent
  extends Crud
  implements OnInit
{
  additionalComponentTitleList = [];
  constructor(
    private additionalComponentTitleService: AdditionalComponentTitleService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    private productService: ProductService
  ) {
    super(additionalComponentTitleService, notifier, spinner, translate, route);
    this.form = this.formBuilder.group({
      id:[0],
      title: [
        '',
        [
          Validators.required,
          Validators.pattern(Pattern.OnlyEnglishLettersAndSpace),
        ],
      ],
      titleAr: [
        '',
        [Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)],
      ],
      numberOfSelect: [null],
      productDetailsId: [null, [Validators.required]],
      isActive: ['', [Validators.required]],
      isRequired: ['', [Validators.required]],
      minOfSelect: [0],
      deliverectPLU: [''],
      deliverectModifierGroupId: [''],

    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getById(this.route.snapshot.params.id);
    }
    if (this.route.snapshot.queryParams.ProductDetailsId) {
      this.form
        .get('productDetailsId')
        .patchValue( +this.route.snapshot.queryParams.ProductDetailsId );
    } 
  }

  // GetDetailsDDL() {
  //   this.spinner.show();
  //   this.productService.GetDetailsDDL().subscribe(
  //     (result) => {
  //       this.spinner.hide();
  //       this.additionalComponentTitleList = result;
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //     }
  //   );
  // }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.mainService.create(clean(body)).subscribe(
      (result) => {
        this.notifier.notify('success', this.translate.instant('created'));
        this.spinner.hide();
        this.form.reset();
        this.form.get('id').patchValue(0);
      },
      (err) => {
        this.spinner.hide();
        // this.notifier.notify('error',err)
      }
    );
  }
}
