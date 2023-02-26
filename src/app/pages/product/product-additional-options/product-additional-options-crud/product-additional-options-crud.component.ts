import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdditionalOptionService, Dropdown, FormMode } from 'src/app/shared';
import { ProductAdditionalOptionService } from '../services';

@Component({
  selector: 'app-product-additional-options-crud',
  templateUrl: './product-additional-options-crud.component.html',
  styleUrls: ['./product-additional-options-crud.component.scss']
})
export class ProductAdditionalOptionsCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  additionalOptionList: Dropdown[] = [];
  busyLoadingAdditionalOption: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productAdditionalOptionService: ProductAdditionalOptionService,
    private additionalOptionService: AdditionalOptionService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,
    private activatedRoute: ActivatedRoute ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      additionalOptionId: ['', [ Validators.required]],
      productId: ['', [ Validators.required]],     
    });
  }

  ngOnInit(): void {
    this.getAdditionalOption();
  }
   getAdditionalOption(){
    this.busyLoadingAdditionalOption = true;
    this.additionalOptionService.getDropdown().subscribe((res:Dropdown[]) =>{
      this.busyLoadingAdditionalOption = false;
      this.additionalOptionList = res
    }, err =>{
      console.log(err);
      this.busyLoadingAdditionalOption = false;
    })
  }
  create() {
    this.form.markAllAsTouched();
    this.form.get('productId').patchValue(this.activatedRoute.snapshot.params.productId)
    if(!this.form.valid) return;
    let body = this.form.value;
    this.spinner.show();
    this.productAdditionalOptionService.create(body).subscribe(result => {
      this.form.reset();
      this.form.get('id').patchValue(0);
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.created'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}