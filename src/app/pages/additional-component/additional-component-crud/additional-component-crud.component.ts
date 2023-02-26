import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Pattern, FormMode } from 'src/app/shared';
import { clean } from 'src/app/util';
import { AdditionalComponentTitleService } from '../../additional-component-title/services/additional-component-title.service';
import { ProductService } from '../../product/services';
import { AdditionalComponentService } from '../services/additional-component.service';

@Component({
  selector: 'app-additional-component-crud',
  templateUrl: './additional-component-crud.component.html',
  styleUrls: ['./additional-component-crud.component.scss']
})
export class AdditionalComponentCrudComponent extends Crud implements OnInit {
  additionalComponentTitleList = []
  constructor(
    private additionalComponentService: AdditionalComponentService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    private additionalComponentTitleService: AdditionalComponentTitleService,
    public spinner: NgxSpinnerService
  ) { 
    super(additionalComponentService,notifier,spinner,translate,route)
    this.form = this.formBuilder.group({
      id:[0],
      componentName: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      componentNameAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      price: [0],
      additionalComponentTitleId: [null,[ Validators.required]],
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
    if (this.route.snapshot.queryParams.additionalComponentTitleId) {
      this.form
        .get('additionalComponentTitleId')
        .patchValue( +this.route.snapshot.queryParams.additionalComponentTitleId );
    } 
  }

  // getDdl(){
  //   this.spinner.show();
  //   this.additionalComponentTitleService.GetDDL().subscribe(result => {
  //     this.spinner.hide();
  //     this.additionalComponentTitleList = result
  //   },err => {
  //     this.spinner.hide()
  //   })
  // }
  // create() {
  //   let body = this.form.value;
  //   this.spinner.show();
  //   this.mainService.create(clean(body)).subscribe(result => {
  //     this.spinner.hide();
  //     this.form.reset();
  //     this.form.get('id').patchValue(0);
  //     this.notifier.notify('success',this.translate.instant('created'))
  //   },err=>{
  //     this.spinner.hide();
  //     // this.notifier.notify('error',err)
  //   })
  // }

  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.additionalComponentService.edit(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }

}