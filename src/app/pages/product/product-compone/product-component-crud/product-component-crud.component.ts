import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pattern } from 'src/app/shared';
import { ProductComponentService } from '../services/product-component.service';

@Component({
  selector: 'app-product-component-crud',
  templateUrl: './product-component-crud.component.html',
  styleUrls: ['./product-component-crud.component.scss']
})
export class ProductComponentCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  formSubmited

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productComponentService: ProductComponentService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      componantName: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      componantNameAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      isBasicComponent: ['', [ Validators.required]], 
      isActive: ['', [ Validators.required]], 
      productDetailsId: [this.route.snapshot.params.detailsId]
      
    });

    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      // this.isView = true;
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getFaqsById(this.route.snapshot.params.id)
    }
  }


  getFaqsById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.productComponentService.getByID(id).subscribe(res => {
      this.spinner.hide();
      this.busyLoading = false;
      this.form.patchValue(res)
    },err => {
    this.spinner.show();
      this.busyLoading = false;
    })
  }


  submit() {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;
    console.log(this.form)
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.productComponentService.create(body).subscribe(result => {
      this.form.reset();
      this.form.get('id').patchValue(0);
      this.form.get('productDetailsId').patchValue(this.route.snapshot.params.detailsId);
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.created'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.productComponentService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }

 
}