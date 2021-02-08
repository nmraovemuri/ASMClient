import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ASMService } from './asm.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req,next){
    let authService = this.injector.get(ASMService);
    let tokenizedReq = req.clone({
      setHeaders : {
     //   Authorization : 'Bearer : xx.yy.zz'
        Authorization : `Bearer : ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
