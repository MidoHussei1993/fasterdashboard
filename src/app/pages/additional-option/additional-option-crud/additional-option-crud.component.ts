import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Pattern, FormMode } from 'src/app/shared';
import { ProductService } from '../../product/services';
import { AdditionalOptionService } from '../services/additional-option.service';

@Component({
  selector: 'app-additional-option-crud',
  templateUrl: './additional-option-crud.component.html',
  styleUrls: ['./additional-option-crud.component.scss']
})
export class AdditionalOptionCrudComponent extends Crud implements OnInit {
  additionalOptionList = []
  constructor(
    private additionalOptionService: AdditionalOptionService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
    private productService: ProductService,
  ) { 
    super(additionalOptionService,notifier,spinner,translate,route)
    this.form = this.formBuilder.group({
      id: [0],
      name: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      nameAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      note: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      noteAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      productAdditionalOptionsId: [null,[ Validators.required]],
      isActive: ['', [ Validators.required]], 
      price: ['', [ Validators.required]], 

    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getById(this.route.snapshot.params.id)
    }
    this.getAdditionalOptionDdl()
  }

  getAdditionalOptionDdl(){
    this.spinner.show();
    this.additionalOptionService.GetDDL().subscribe(result => {
      this.spinner.hide();
      this.additionalOptionList = result
    },err => {
      this.spinner.hide()
    })
  }

  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.additionalOptionService.edit(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }

}