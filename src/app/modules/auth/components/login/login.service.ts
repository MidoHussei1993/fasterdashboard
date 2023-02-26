import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user.model';
import { END_POINTS } from 'src/app/core/Http/globals/global-config';
import { IRefreshToken } from '../../models';

import jwt_decode from "jwt-decode";

const API_URL = END_POINTS.Identity;

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  // login
  login(model: User): Observable<any> {
    return this.http.post(API_URL.login, model).pipe(
      map((res: any)=>{
        let decode:any = jwt_decode(res.token);
        if(Array.isArray(decode.roles)){
          localStorage.setItem('roles' ,JSON.stringify(decode.roles) );
        }else{
          localStorage.setItem('roles' ,JSON.stringify([decode.roles]) );
        }
        return res;
      })
    );
  }

  refreshToken(): Observable<IRefreshToken>{
    return this.http.post<IRefreshToken>(API_URL.refreshToken,{
      refreshToken: localStorage.getItem('refreshToken')
    })
  }
}
