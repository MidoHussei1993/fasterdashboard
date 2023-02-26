import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from '../models/changepsssword.model';
import { FormMode } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../services/identity.service';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  // main object category
  changePassword: ChangePassword = new ChangePassword();
  categoryForm: FormGroup;
  hasError: boolean;
  returnUrl: string;

    // check Add or update
    isAdd: boolean;
    // page Title
    title: string;
    mode: FormMode;
    form: FormGroup;
    busyLoading: boolean = false;
    currentLanguage: string = '';
    formSubmited

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private identityService: IdentityService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private translate: TranslateService,
    private spinner:NgxSpinnerService ,
  ) {


    this.form = this.formBuilder.group({
      oldPassword: ['', [ Validators.required]],
      newPassword: ['', [ Validators.required]],

    });


    this.mode = this.route.snapshot.data.mode;
    this.currentLanguage = this.translate.currentLang;

   }

  ngOnInit(): void {

    if(this.mode == FormMode.Edit || this.mode == FormMode.View){
    }
  }


  submit() {
    if(!this.form.valid) return;
    if (this.mode === FormMode.Create) {
      this.create();
    }
  }
  create() {
    let body = this.form.value;
    this.spinner.show();
    this.identityService.changePassword(body).subscribe(result => {
      this.form.reset();
      this.spinner.hide();
      this.notifier.notify('success',this.translate.instant('global.created'))
    },err=>{
      this.spinner.hide();
      this.notifier.notify('error',err)
    })
  }

}
