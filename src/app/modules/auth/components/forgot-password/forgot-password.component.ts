import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { IdentityService } from 'src/app/pages/identity/services/identity.service';
import { NotifierService } from 'angular-notifier';
import { WizardComponent } from 'angular-archwizard';
import { Route, Router } from '@angular/router';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  form: FormGroup;
  currentLanguage: string = '';
  token: string = ''
  @ViewChild(WizardComponent)
    public wizard: WizardComponent;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private identityService: IdentityService,
    private notifier: NotifierService,
    private router: Router,
  ) {
    this.isLoading$ = this.authService.isLoading$;

    this.form = this.fb.group({
      otp: ['', [Validators.required]],
      userName: ['', [Validators.required,Validators.email]],
      newPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  getOTP(step?: string){
    if(this.form.get('userName').valid){
      this.spinner.show();
      this.identityService.getOTP(this.form.get('userName').value).subscribe(res=>{
        this.spinner.hide();
        if(step != 'nextStep'){
          this.wizard.goToNextStep();
        }
      },err=>{
        this.spinner.hide();
      })
    }
  }
  sendOTP(){
    if(this.form.get('otp').valid){
      let body: any = {
        userName : this.form.get('userName').value,
        otp : this.form.get('otp').value,
      }
      this.spinner.show();
      this.identityService.sendOTP(body).subscribe(res=>{
        this.spinner.hide();
        this.token = res.returnData.response;
        this.wizard.goToNextStep();

      },err=>{
        this.spinner.hide();
      })
    }
  }

  resetPassword(){
    if (!this.token.length) return;
    if(this.form.get('newPassword').valid){
      let body: any = {
        password : this.form.get('newPassword').value,
        token : this.token,
      }
      this.spinner.show();
      this.identityService.NewPassword(body).subscribe(res=>{
        this.spinner.hide();
        this.token = res.returnData.response;
        this.notifier.notify(
          'success',
          this.translate.instant('action.done')
        );
        this.router.navigateByUrl('/auth/login');
      },err=>{
        this.spinner.hide();
      })
    }
  }


  submit() {
    if (!this.form.valid) return;
    let body = this.form.value;
    this.spinner.show();
    this.identityService.ForgetPassword(body).subscribe(
      (result) => {
        this.form.reset();
        this.spinner.hide();
        this.notifier.notify(
          'success',
          this.translate.instant('global.created')
        );
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
}
