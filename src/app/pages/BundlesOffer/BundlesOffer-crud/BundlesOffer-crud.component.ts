import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormMode } from 'src/app/shared';
import { BundlesOffer } from '../models';
import { BundleOfferService } from '../services';
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-BundlesOffer-crud',
  templateUrl: './BundlesOffer-crud.component.html',
  styleUrls: ['./BundlesOffer-crud.component.scss']
})
export class BundleCrudComponent implements OnInit {


  @ViewChild('coboneForm', {static: false}) myForm: NgForm;



 // main object BundlesOffer
 bundleoffer:BundlesOffer = new BundlesOffer();

 bundleForms:BundlesOffer = new BundlesOffer();

  bundleForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  // check Add or update
  isAdd:boolean;

  // page Title
  title:string;

  mode:FormMode;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  formSubmited;
  form: FormGroup;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bundleService:BundleOfferService,
    private translate: TranslateService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder,
    private spinner:NgxSpinnerService ,


  ) {
    this.form = this.formBuilder.group({
      id: [0],
      bundleName: ['', [ Validators.required]],
      bundleNameAr: ['', [ Validators.required]],
      expiryDate: ['', [ Validators.required]],
      description: ['', [ Validators.required]],
      descriptionAr: ['', [ Validators.required]],
      discountPercentage: ['', [ Validators.required]],

      createAt: new Date()


    });
    this.mode = this.route.snapshot.data.type;

    //  console.log(this.route.snapshot.data.type)
        this.currentLanguage = this.translate.currentLang;
        if (this.mode === FormMode.View) {
          // this.isView = true;
          this.form.disable();
        }   }

  ngOnInit(): void {

       // init form
       if(this.mode == FormMode.Edit || this.mode == FormMode.View){
        this.bundleoffer = new BundlesOffer();
        this.bundleoffer.id = this.route.snapshot.params.id;
        this.getBundleById(this.bundleoffer.id );
      }

      }

      getBundleById(id){
    this.bundleService.getByID(id).subscribe(
      res=>{
        this.bundleoffer = res;


  }
    )}


    submit() {
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
      this.bundleService.create(body).subscribe(result => {
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
      this.bundleoffer= this.form.value;
      this.bundleoffer.id =  this.route.snapshot.params.id
      this.spinner.show();
      this.bundleService.update(this.bundleoffer).subscribe(result => {
        this.spinner.hide();
        this.notifier.notify('success',this.translate.instant('global.edited'))
      },err=>{
        this.spinner.hide();
        // this.notifier.notify('error',err)
      })
    }

}
