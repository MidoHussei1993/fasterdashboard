import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Crud, Pattern, FormMode } from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { Shop } from '../../shop/models';
import { FoodTypeService } from '../services/food-type.service';

@Component({
  selector: 'app-food-type-crud',
  templateUrl: './food-type-crud.component.html',
  styleUrls: ['./food-type-crud.component.scss']
})
export class FoodTypeCrudComponent extends Crud implements OnInit {
  @ViewChild('imgViewer', { static: false }) imgViewer:ImgViewerComponent;
  shoplist: Shop[] = [];
  titles: string[] = [
    'Id',
    'shop.shop_name',
    'shop.shop_name',
    'field.shopDescription',
    'field.shopDescriptionAr',
  ];
  properties: string[] = [
    'id',
    'shopName',
    'shopNameAr',
    'shopDescription',
    'shopDescriptionAr',
  ];
  constructor(
    private foodTypeService: FoodTypeService,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public notifier: NotifierService,
    public translate: TranslateService,
    public spinner: NgxSpinnerService,
  ) { 
    super(foodTypeService,notifier,spinner,translate,route)
    this.form = this.formBuilder.group({
      id: [0],
      foodTypeName: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      foodTypeNameAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      isActive: ['', [ Validators.required]], 
      avatar: ['', [ Validators.required]], 

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
  }

  getById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.mainService.getById(id).subscribe(res => {
      this.spinner.hide();
      this.busyLoading = false;
      this.form.patchValue(res);
      this.shoplist = res.shops;
    },err => {
    this.spinner.hide();
      this.busyLoading = false;
    })
  }

  async handleInputChange(event, prop: string) {
    const file = event.target.files[0];
    this.foodTypeService.uploadImage(file).subscribe((res) => {
      this.form.get(prop).patchValue(res.returnData.response);
    });
  }

  viewImage(){
    this.imgViewer.openBackDropCustomClass();
  }

}