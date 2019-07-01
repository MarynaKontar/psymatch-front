import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {RegistrationService} from '../registration/registration.service';
import {ComponentName} from '../common-components/services/component-name';
import {LogService} from '../common-components/services/log.service';

@Injectable({
  providedIn: 'root'
})
export class AnonimRegistrationGuard implements CanActivate {
  constructor(private registrationService: RegistrationService,
              private router: Router,
              private log: LogService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.registrationService.isRegistered() && this.registrationService.isAnonimRegistered()) {
    if (this.registrationService.isAnonimRegistered()) {
      this.log.log(ComponentName.ANONIM_REGISTRATION_GUARD, `canActivate: isAnonimRegistered=TRUE`);
      return true;
    } else {
      this.log.log(ComponentName.ANONIM_REGISTRATION_GUARD, `canActivate: isAnonimRegistered=FALSE`);
      this.log.log(ComponentName.ANONIM_REGISTRATION_GUARD, `canActivate: returnUrl=${state.url}`);
      this.router.navigate(['anonim-registration'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}