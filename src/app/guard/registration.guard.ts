import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {RegistrationService} from '../registration/registration.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  constructor(private registrationService: RegistrationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.registrationService.isRegistered()) {
      return true;
    } else {
      this.router.navigate(['register'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
