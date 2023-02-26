import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pattern } from 'src/app/shared';
import { ItemSizeService } from '../services/item-size.service';

@Component({
  selector: 'app-item-size-crud',
  templateUrl: './item-size-crud.component.html',
  styleUrls: ['./item-size-crud.component.scss']
})
export class ItemSizeCrudComponent implements OnInit {

  
  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  shopBranchId: number = null;
  formSubmited

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private itemSizeService: ItemSizeService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      sizeName: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      sizeNameAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
     
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
      this.shopBranchId = this.route.snapshot.params.id;
      this.getItemSizeById(this.shopBranchId)
    }
  }


  getItemSizeById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.itemSizeService.getByID(id).subscribe(res => {
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
    this.itemSizeService.create(body).subscribe(result => {
      this.form.reset();
      this.form.get('id').patchValue(0);
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
    this.itemSizeService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}