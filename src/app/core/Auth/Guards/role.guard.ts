import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let Roles: string[] = JSON.parse(localStorage.getItem('roles'));
    console.log(Roles)
    console.log(route.data.role)
    if(Roles.includes('administrator')){
      return true;
    }else{
      let isRoleExist = false;
      route.data.role.map(item=>{
        Roles.map(role => {
          if(item == role){
            isRoleExist = true;
          }
        })
      });
      if(isRoleExist)return true;
      else return false;
    }
    


    
  }
  
}
