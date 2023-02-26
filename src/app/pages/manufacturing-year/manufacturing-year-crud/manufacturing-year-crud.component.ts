import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { ManufacturingYearService } from '../services/manufacturing-year.service';

@Component({
  selector: 'app-manufacturing-year-crud',
  templateUrl: './manufacturing-year-crud.component.html',
  styleUrls: ['./manufacturing-year-crud.component.scss']
})
export class ManufacturingYearCrudComponent implements OnInit {
  mode: FormMode;
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  formSubmited

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private manufacturingYear: ManufacturingYearService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      year: ['', [ Validators.required]],
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
      this.getManufacturingYearById(this.route.snapshot.params.id)
    }
  }


  getManufacturingYearById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.manufacturingYear.getByID(id).subscribe((res:any) => {
      this.spinner.hide();
      this.busyLoading = false;
      res.year = +res.year
      this.form.patchValue(res)
      console.log(this.form.value);
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
    body.year = String(body.year);
    this.spinner.show();
    this.manufacturingYear.create(body).subscribe(result => {
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
    body.year = String(body.year);
    this.spinner.show();
    this.manufacturingYear.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}