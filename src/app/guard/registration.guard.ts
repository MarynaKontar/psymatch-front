import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {RegistrationService} from '../registration/registration.service';
import {LoginService} from '../login/login.service';
import {ComponentName} from '../common-components/services/component-name';
import {LogService} from '../common-components/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  constructor(private registrationService: RegistrationService,
              private loginService: LoginService,
              private router: Router,
              private log: LogService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.registrationService.isRegistered() || !this.loginService.isLogin()) {
      this.log.log(ComponentName.REGISTRATION_GUARD, `canActivate: registered||!login=TRUE`);
      return true;
    } else {
      this.log.log(ComponentName.REGISTRATION_GUARD, `canActivate: registered||!login=FALSE`);
      this.log.log(ComponentName.REGISTRATION_GUARD, `canActivate: returnUrl=${state.url}`);
      this.router.navigate(['register'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
