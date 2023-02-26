import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../shared/api/authentication.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loginStatus: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.loginStatus = this.authService.getLoginStatus();
    if(this.loginStatus == false) {
      this.router.navigate(['/auth/login']);

    } else {
        // this.router.navigate(['/user/register']);
        return  this.loginStatus
    }

}
}
