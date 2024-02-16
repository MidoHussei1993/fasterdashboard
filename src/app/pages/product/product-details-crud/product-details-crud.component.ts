import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Pattern } from 'src/app/shared';
import { ProductService } from '../services';

@Component({
  selector: 'app-product-details-crud',
  templateUrl: './product-details-crud.component.html',
  styleUrls: ['./product-details-crud.component.scss']
})
export class ProductDetailsCrudComponent implements OnInit {

  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  productComponent: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      title: ['', [ Validators.required]],
      titleAr: ['', [ Validators.required]],
      healthInformation: ['', [ Validators.required]],
      healthInformationAr: ['', [ Validators.required]],
      note: [''],
      noteAr: [''],
      coverImage: ['', [ Validators.required]],
      productId: ['', [ Validators.required]],
      price: ['', [ Validators.required]],     
      lastPrice: ['', [ Validators.required]],     
      availableFromHour: [''],     
      availableToHour: [''],  
      snoozeStart: [''],     
      snoozeEnd: [''], 
      deliverectProductId: [''],     
      deliverectPLU: [''],     
      sort: [0],
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
      this.getProductDetailsByID(this.route.snapshot.params.id);
    }
  }

  getProductDetailsByID(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.productService.getProductDetailsByID(id).subscribe((res: any) => {
      this.spinner.hide();
      this.busyLoading = false;
      this.productComponent = res.productComponants;
      res.snoozeStart = new Date(res.snoozeStart);
      res.snoozeEnd = new Date(res.snoozeEnd);
      this.form.patchValue(res)

    },err => {
    this.spinner.show();
      this.busyLoading = false;
    })
  }
  async handleInputChange(event) {
    const file = event.target.files[0];
    this.productService.uploadProductDetailsImage(file).subscribe(res => {
      this.form.get('coverImage').patchValue(res.returnData.response)
    })
  }

  submit() {
    console.log(this.form)
    this.form.markAllAsTouched();
    this.form.get('productId').patchValue(this.route.snapshot.params.productId)
    if(!this.form.valid) return;
    if (this.mode === FormMode.Create) {
      this.create();
    } else {
      this.edit();
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.productService.createProduectDetails(body).subscribe(result => {
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
    this.productService.updateProductDetails(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}