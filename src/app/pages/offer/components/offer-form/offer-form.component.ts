import { offerDto } from './../../model/offerDto';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../services';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode, Dropdown, Pattern } from 'src/app/shared';
import { Observable } from 'rxjs';
import { OfferList } from '../../model/offerList.model';
import { ProductService } from 'src/app/pages/product/services';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';

// interface event target
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit {
  productList: Dropdown[] = [];
  mode: FormMode;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  form: FormGroup;

  @ViewChild('imgViewer', { static: false }) imgViewer:ImgViewerComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private offerService: OfferService,
    private translate: TranslateService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private renderer2: Renderer2
  ) {
    this.form = this.formBuilder.group({
      id: [0],
      description: ['', [Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      descriptionAr: ['', [Validators.required,Validators.pattern(Pattern.OnlyArabicLetters)]],
      expiryAt: ['', [Validators.required]],
      productId: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
      offerImage: ['', [Validators.required]],
    });
    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;
    if (this.mode === FormMode.View) {
      this.form.disable();
    }
  }

  ngOnInit(): void {
    // getProduct
    this.getProduct();

    // init form
    if (this.mode == FormMode.Edit || this.mode == FormMode.View) {
      this.getofferById(this.route.snapshot.params.id);
    }
  }

  viewImage(){
    this.imgViewer.openBackDropCustomClass();
  }

  getofferById(id) {
    this.busyLoading = true;
    this.spinner.show();
    this.offerService.getByID(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.busyLoading = false;
        this.form.patchValue(res);
      },
      (err) => {
        this.spinner.show();
        this.busyLoading = false;
      }
    );
  }

  // get all prodoct

  getProduct() {
    this.productService.getProductsDDL().subscribe((res) => {
      this.productList = res;
    });
  }

  submit() {
    this.form.markAllAsTouched();
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
    this.offerService.create(body).subscribe(result => {
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
    this.offerService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
  async handleInputChange(event) {
    const file = event.target.files[0];
    this.productService.uploadProductImage(file).subscribe(res => {
      this.form.get('offerImage').patchValue(res.returnData.response)
    })
  }
}
