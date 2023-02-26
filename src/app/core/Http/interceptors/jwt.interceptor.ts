import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var require;
var jwtDecode = require("jwt-decode");

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let header = {}
        let token = localStorage.getItem('token');

        if(token) {
            header['Authorization'] = 'Bearer' +' '+ token;
        }
        if (request.url.includes('firebaseio.com/Phone.json')) {
            return next.handle(request);
        }
        request = request.clone({
            setHeaders: header
        });
        return next.handle(request);
    }
}
