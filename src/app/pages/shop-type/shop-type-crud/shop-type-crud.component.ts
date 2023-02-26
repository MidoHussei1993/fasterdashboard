import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pattern } from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { ShopTypeService } from '../services';

@Component({
  selector: 'app-shop-type-crud',
  templateUrl: './shop-type-crud.component.html',
  styleUrls: ['./shop-type-crud.component.scss']
})
export class ShopTypeCrudComponent implements OnInit {

  @ViewChild('imgViewer', { static: false }) imgViewer:ImgViewerComponent;

  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  formSubmited

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private shopTypeService: ShopTypeService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      type: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      typeAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      description: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      descriptionAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      shopTypeAvatar: ['', [ Validators.required]],     
      color: ['', [ Validators.required]],     
      isActive: ['', [ Validators.required]],
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

  viewImage(){
    this.imgViewer.openBackDropCustomClass();
  }

  getFaqsById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.shopTypeService.getByID(id).subscribe(res => {
      this.spinner.hide();
      this.busyLoading = false;
      this.form.patchValue(res)
    },err => {
    this.spinner.hide();
      this.busyLoading = false;
    })
  }
  async handleInputChange(event) {
    const file = event.target.files[0];
    this.shopTypeService.UploadImage(file).subscribe(res => {
      this.form.get('shopTypeAvatar').patchValue(res.returnData.response)
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
    this.shopTypeService.create(body).subscribe(result => {
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
    this.shopTypeService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}