import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormMode } from 'src/app/shared';
import { ChangePassword } from '../models/changepsssword.model';
import { ResetPassword } from '../models/resetPassword.model';
import { IdentityService } from '../services/identity.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  // main object category
  resetPassword: ResetPassword = new ResetPassword();
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
        userId: [this.route.snapshot.params.id, [ Validators.required]],
        password: ['', [ Validators.required]],

      });

      this.mode = this.route.snapshot.data.mode;
      this.currentLanguage = this.translate.currentLang;
     }

    ngOnInit(): void {

      let token = localStorage.getItem('token');
      let decodeToken = jwt_decode(token);
      if(this.mode == FormMode.Edit || this.mode == FormMode.View){
      }
    }


    submit() {
      console.log(this.form);
      if(!this.form.valid) return;
        this.create();
    }
    create() {
      let body = this.form.value;
      this.spinner.show();
      this.identityService.ResetPassword(body).subscribe(result => {
        this.form.reset();
        this.spinner.hide();
        this.notifier.notify('success',this.translate.instant('global.created'))
      },err=>{
        this.spinner.hide();
        this.notifier.notify('error',err)
      })
    }

}
