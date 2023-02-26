import { Country } from './../country.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedServiceService } from '../SharedService.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { FormMode } from 'src/app/shared';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-country-add-edit',
  templateUrl: './country-add-edit.component.html',
  styleUrls: ['./country-add-edit.component.scss']
})
export class CountryAddEditComponent implements OnInit {

  @ViewChild('CountryForms', {static: false}) myForm: NgForm;



 // main object country
 country:Country = new Country();

 CountryForms:Country = new Country();

  countryForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = [];

  // check Add or update
  isAdd:boolean;

  // page Title
  title:string;

  // page Title
  mode: FormMode;
  form: FormGroup;
  busyLoading: boolean = false;
  currentLanguage: string = '';
  formSubmited;
  view:boolean;
  add:boolean


  constructor(
    private spinner:NgxSpinnerService ,
    private formBuilder: FormBuilder,
    private sharedService:SharedServiceService,
    private route:ActivatedRoute,
    private notifier: NotifierService,
    private translate: TranslateService,

    ) {
      this.form = this.formBuilder.group({
        id: [0],
        countryName: ['', [ Validators.required]],
        countryNameAr: ['', [ Validators.required]],
        createAt: new Date()

      });

      this.mode = this.route.snapshot.data.mode;
      this.currentLanguage = this.translate.currentLang;
      if (this.mode === FormMode.View) {
        // this.isView = true;
        this.form.disable();
      }

    }


  ngOnInit(): void {



        // Activate Router
        if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'create') {
          this.isAdd = true;
          this.mode === FormMode.Create;
          this.view = false;
          this.add = true;

        }
      else  if ( this.route.snapshot.data.type === 'View') {
        this.mode === FormMode.Edit;
        this.mode === FormMode.View
        this.country = new Country();
          this.country.id = this.route.snapshot.params.id;
         this.view = true;
         this.add = false;
        this.getCountryById(this.country.id);

        }


        else {
          this.mode === FormMode.Edit;
          this.mode === FormMode.View
          this.country = new Country();
            this.country.id = this.route.snapshot.params.id;
           this.view = true;
           this.add = true;
      this.getCountryById(this.country.id);
      }
  }

    getCountryById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.sharedService.getByID(id).subscribe(res => {
      this.spinner.hide();
      this.country = new Country();
      this.country = res;
      this.busyLoading = false;
      this.form.patchValue(res)
    },err => {
    this.spinner.show();
      this.busyLoading = false;
    })
  }

  submit() {
    if(!this.form.valid) return;
    if (this.route.snapshot.queryParams.isAdd === 'true' || this.route.snapshot.routeConfig.path === 'create') {
      this.create();

    }else{
      this.edit();

    }


  }

  create() {

    let body = this.form.value;
    this.spinner.show();
    this.sharedService.create(body).subscribe(result => {
      this.form.reset();
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.created'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }

  edit() {
    let body = this.form.value;
    this.spinner.show();
    this.sharedService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }


}
