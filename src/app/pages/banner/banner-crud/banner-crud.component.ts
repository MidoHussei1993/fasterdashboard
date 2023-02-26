import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, Pattern } from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { ShopService } from '../../shop/services';
import { Banner } from '../models';
import { BannerService } from '../services';

@Component({
  selector: 'app-banner-crud',
  templateUrl: './banner-crud.component.html',
  styleUrls: ['./banner-crud.component.scss']
})
export class BannerCrudComponent implements OnInit {
  @ViewChild('imgViewer', { static: false }) imgViewer:ImgViewerComponent;

  mode: FormMode;
  banner:Banner
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  shopBranchId: number = null;
  shopList: Dropdown[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bannerService: BannerService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,
    private shopService: ShopService


  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      description: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      descriptionAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      imagePath: ['', [ Validators.required]],
      isActive: ['', [ Validators.required]],
      shopId: [''],
     
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
      this.banner = new Banner();
      this.shopBranchId = this.route.snapshot.params.id;
      this.getBannerById(this.shopBranchId)
    }
    this.getShopList();
  }

  getShopList(){
    this.shopService.getDropdown().subscribe((res:Dropdown[]) =>{
      this.shopList = res
    }, err =>{
      console.log(err);
    })
  }
  viewImage(){
    this.imgViewer.openBackDropCustomClass();
  }

  getBannerById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.bannerService.getByID(id).subscribe(res => {
      this.spinner.hide();
      this.banner = new Banner();
      this.banner = res;
      this.busyLoading = false;
      this.form.patchValue(res)
    },err => {
    this.spinner.show();
      this.busyLoading = false;
    })
  }

  async handleInputChange(event) {
    const file = event.target.files[0];
    this.bannerService.UploadImage(file).subscribe(res => {
      this.form.get('imagePath').patchValue(res.returnData.response)
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
    this.bannerService.create(body).subscribe(result => {
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
    this.bannerService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}