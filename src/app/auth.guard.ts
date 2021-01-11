import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import {AboutService } from './about.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private aserv:AboutService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
     {
       if(this.aserv.isLoggedIn()==null){
         this.router.navigate(['/login']);
         return false;
       }
       else
       {
        return true;
       }
       
     }
  
}
