import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  userAuth: any;
  canActivate(): boolean {
    this.userAuth = sessionStorage.getItem('auth');
    if(this.userAuth =="Member"){
    console.log(this.userAuth);
    return false
    }
    return true
  }
  
}
