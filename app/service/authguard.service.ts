import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const requiredRole = route.data['requiredRole'];
    const LoggedInRole = localStorage.getItem('role');
    if(requiredRole === LoggedInRole){
      console.log(requiredRole + " " + LoggedInRole);
      return true;
    }
    else{
      console.log('Authorization failed redirecting')
      alert("You don't have access to this page")
      this.router.navigate(['/']);
      return false;
    }
  }
}
