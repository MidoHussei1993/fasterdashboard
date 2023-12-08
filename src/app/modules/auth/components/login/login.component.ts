import { User } from './user.model';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  user: User = new User();
  defaultAuth: User = new User();
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading: boolean = false;

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private translate: TranslateService
  ) {
    // this.isLoading = this.authService.isLoading;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.initForm();
  }

  ngOnInit(): void {
    this.user = new User();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    navigator.geolocation.getCurrentPosition((p) => {
      this.user.tRole = p.coords.latitude;
      this.user.gRole = p.coords.longitude;
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        this.defaultAuth.username,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      tRole: '',
      gRole: '',
    });
  }

  submit() {
    this.hasError = false;
    this.isLoading = true;
    this.loginService.login(this.user).subscribe(
      (res: any) => {
        this.isLoading = false;
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('token', res.token);
        if (this.route.snapshot.queryParamMap.get('redirectFrom')) {
          window.location.href =
            this.route.snapshot.queryParamMap.get('redirectFrom');
          return;
        }
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        this.isLoading = false;
        this.hasError = false;

        Swal.fire({
          position: 'center',
          text: this.translate.instant('err.login'),
          icon: 'error',
          confirmButtonText: this.translate.instant('action.done'),
          cancelButtonText: 'لا',
          showCancelButton: false,
          showCloseButton: false,
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
