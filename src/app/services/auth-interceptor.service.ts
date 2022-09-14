import { HttpInterceptor, HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
     return this.authService.user.pipe(take(1), switchMap(user => {
       if(!user || req.url == "https://fakestoreapi.com/products"){
        return next.handle(req)
       }
       console.log("req url", req.url);
       const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user.token)
       })
       return next.handle(modifiedReq)
     }))
  }

}
