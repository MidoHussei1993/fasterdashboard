import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { GeneralSuggest } from '../models';
import { GeneralSuggestService } from '../services';

@Component({
  selector: 'app-general-suggest-crud',
  templateUrl: './general-suggest-crud.component.html',
  styleUrls: ['./general-suggest-crud.component.scss']
})
export class GeneralSuggestCrudComponent implements OnInit {

  mode: FormMode;
  generalSuggest:GeneralSuggest
  form: FormGroup;
  busyLoading:boolean = false;
  currentLanguage:string = '';
  shopBranchId: number = null;
  formSubmited
  reply:string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private generalSuggestService: GeneralSuggestService,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,

  ) { 
    this.form = this.formBuilder.group({
      id: [0],
      // title: ['', [ Validators.required]],
      note: ['', [ Validators.required]],
     
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
      this.generalSuggest = new GeneralSuggest();
      this.getGeneralSuggestById( this.route.snapshot.params.id)
    }
  }


  getGeneralSuggestById(id:number){
    this.busyLoading = true;
    this.spinner.show();
    this.generalSuggestService.getByID(id).subscribe(res => {
      this.spinner.hide();
      this.generalSuggest = new GeneralSuggest();
      this.generalSuggest = res;
      this.busyLoading = false;
      this.form.patchValue(res)
    },err => {
    this.spinner.show();
      this.busyLoading = false;
    })
  }
  finish(){
    this.spinner.show();
    this.generalSuggestService.finish(this.route.snapshot.params.id).subscribe(res => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('action.done'))
      this.getGeneralSuggestById(this.route.snapshot.params.id)

    },err => {
    this.spinner.show();
    })
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
    this.generalSuggestService.create(body).subscribe(result => {
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
    this.generalSuggestService.update(body).subscribe(result => {
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.edited'))
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }

  sendReply(){
    if(!this.reply) return;
    this.spinner.show();
    this.generalSuggestService.addReply(
      {
        generalSuggestId: this.route.snapshot.params.id,
        message:this.reply
      }
    ).subscribe(result => {
      this.spinner.hide();
      this.reply = null;
      this.notifier.notify('success',this.translate.instant('global.created'))
      this.getGeneralSuggestById( this.route.snapshot.params.id)
    },err=>{
      this.spinner.hide();
      // this.notifier.notify('error',err)
    })
  }
}