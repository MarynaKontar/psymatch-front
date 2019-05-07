import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {RegistrationService} from '../registration/registration.service';

@Injectable({
  providedIn: 'root'
})
export class AnonimRegistrationGuard implements CanActivate {
  constructor(private registrationService: RegistrationService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.registrationService.isRegistered() && this.registrationService.isAnonimRegistered()) {
    if (this.registrationService.isAnonimRegistered()) {
      return true;
    } else {
      this.router.navigate(['anonim-registration'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
