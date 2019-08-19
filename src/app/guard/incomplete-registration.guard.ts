import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationService } from '../auth/registration/registration.service';
import { ComponentName } from '../common-components/services/component-name';
import { LogService } from '../common-components/services/log.service';
import { LoginService } from '../auth/authentication/login.service';

@Injectable({
  providedIn: 'root'
})
export class IncompleteRegistrationGuard implements CanActivate {
  constructor(private registrationService: RegistrationService,
              private loginService: LoginService,
              private router: Router,
              private log: LogService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.registrationService.isRegistered() && this.registrationService.isIncompleteRegistered()) {
    if (this.loginService.isValueCompatibilityTestPassed() && !this.registrationService.isIncompleteRegistered()) {
      this.log.log(ComponentName.INCOMPLETE_REGISTRATION_GUARD, `canActivate: isIncompleteRegistered=FALSE`);
      this.log.log(ComponentName.INCOMPLETE_REGISTRATION_GUARD, `canActivate: returnUrl=${state.url}`);
      this.router.navigate(['incomplete-registration'], { queryParams: { returnUrl: state.url }});
      return false;
    } else {
      this.log.log(ComponentName.INCOMPLETE_REGISTRATION_GUARD, `canActivate: isIncompleteRegistered=TRUE`);
      return true;
    }
  }
}
