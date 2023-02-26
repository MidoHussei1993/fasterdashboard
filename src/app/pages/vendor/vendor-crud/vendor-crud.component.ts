import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { ImgViewerComponent } from 'src/app/shared/components/img-viewer/img-viewer.component';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-vendor-crud',
  templateUrl: './vendor-crud.component.html',
  styleUrls: ['./vendor-crud.component.scss']
})
export class VendorCrudComponent implements OnInit {
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
    private vendorService: VendorService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      email: ['', [ Validators.required,Validators.email]],
      fullName: ['', [ Validators.required]],
      profileImage: ['', [ Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.minLength(12),Validators.maxLength(12)]],
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
      this.getvendorServiceById(this.route.snapshot.params.id)
    }
  }

  getvendorServiceById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.vendorService.getByID(id).subscribe((res:any) => {
      this.spinner.hide();
      this.busyLoading = false;
      this.form.patchValue(res)
      console.log(this.form.value);
    },err => {
    this.spinner.show();
      this.busyLoading = false;
    })
  }

  async handleInputChange(event) {
    const file = event.target.files[0];
    this.vendorService.uploadImage(file).subscribe(res => {
      this.form.get('profileImage').patchValue(res.returnData.response)
    })
  }

  viewImage(){
    this.imgViewer.openBackDropCustomClass();
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
    this.vendorService.create(body).subscribe(result => {
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
    this.vendorService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}