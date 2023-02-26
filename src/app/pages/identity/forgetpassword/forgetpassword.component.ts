import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { ForgetPassword } from '../models/forgetPAssword.model';
import { IdentityService } from '../services/identity.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  // main object category
  forgetPassword: ForgetPassword = new ForgetPassword();
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
        otp: ['', [ Validators.required]],
        userName: ['', [ Validators.required]],
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
      this.identityService.ForgetPassword(body).subscribe(result => {
        this.form.reset();
        this.spinner.hide();
        this.notifier.notify('success',this.translate.instant('action.done'))
      },err=>{
        this.spinner.hide();
        this.notifier.notify('error',err)
      })
    }


}
