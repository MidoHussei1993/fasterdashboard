import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dropdown, FormMode, Pattern } from 'src/app/shared';
import { CarModelService } from '../../car-model/services';
import { CarNameService } from '../services';

@Component({
  selector: 'app-car-name-crud',
  templateUrl: './car-name-crud.component.html',
  styleUrls: ['./car-name-crud.component.scss']
})
export class CarNameCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  carModelList: Dropdown[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private carNameService: CarNameService,
    private carModelService: CarModelService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      name: ['', [ Validators.required,Validators.pattern(Pattern.OnlyEnglishLettersAndSpace)]],
      nameAr: ['', [ Validators.required, Validators.pattern(Pattern.OnlyArabicLetters)]],
      carModelId: ['', [ Validators.required]], 
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
    this.getCarModelList();
    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      this.getCarNameById(this.route.snapshot.params.id)
    }
  }

  getCarModelList(): void {
    this.carModelService.getDropdown().subscribe(res => {
      this.carModelList = res;
    })
  }


  getCarNameById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.carNameService.getByID(id).subscribe(res => {
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
    this.carNameService.create(body).subscribe(result => {
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
    this.carNameService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}