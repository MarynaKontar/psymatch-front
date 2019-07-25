import { HostListener, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationService } from '../auth/registration/registration.service';
import { LoginService } from '../auth/authentication/login.service';
import { UserAccountService } from '../profile/user-account.service';
import { ComponentName } from '../common-components/services/component-name';
import { LogService } from '../common-components/services/log.service';

export abstract class DeactivationGuarded {
  abstract canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<DeactivationGuarded> {
  canDeactivate(component: DeactivationGuarded):  Observable<boolean> | Promise<boolean> | boolean {
  return component.canDeactivate ? component.canDeactivate() : true;
  }
}

export class DeactivationLoginRegistrationGuarded {
  private retrieveDataResolverDRG;
  returnUrl: string;
  isCanDeactivate: boolean;
  private routeSnapshot: ActivatedRouteSnapshot;
  constructor(public loginService: LoginService,
              public registrationService: RegistrationService,
              public userAccountService: UserAccountService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public log: LogService) {
    this.routeSnapshot = activatedRoute.snapshot;
  }
  // CANDEACTIVATE
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.log.log(ComponentName.DEACTIVATION_LOGIN_REGISTRATION_GUARDER, `isAnonimRegistered: ${this.registrationService.isAnonimRegistered()}`);
    if (
      !this.loginService.isLogin()
      || (this.loginService.isLogin() && this.registrationService.isRegistered())
      || this.registrationService.isRegistered()
      // на страницах, где применяется этот guard и так будет предлогаться зарегестрироваться, если isUserForMatchingToken(). Топорно, но пока не вижу другого выхода
      || (!this.registrationService.isRegistered() && this.userAccountService.isUserForMatchingToken())

      // || this.registrationService.isAnonimRegistered()
    ) {
      this.log.log(ComponentName.DEACTIVATION_LOGIN_REGISTRATION_GUARDER, `canDeactivate(): true`);
      return true;
    } else {
      this.log.log(ComponentName.DEACTIVATION_LOGIN_REGISTRATION_GUARDER, `canDeactivate(): false`);
      // if (!confirm('If you are not registered and will leave the application, your data will be lost. Click Cancel to go to Registration page.')) {
      if (confirm('Вы не зарегистрированы. Зарегистрируйтесть, чтобы ваши данные не были утеряны. Нажмите Ок, чтобы перейти на страницу регистрации.')) {
        this.log.log(ComponentName.DEACTIVATION_LOGIN_REGISTRATION_GUARDER, `canDeactivate(): press Ok`);
        this.retrieve().then(() => this.afterPromise());
        return this.isCanDeactivate;
      } else {
        this.log.log(ComponentName.DEACTIVATION_LOGIN_REGISTRATION_GUARDER, `canDeactivate(): press Cancel`);
        return true; }
    }
  }
  private retrieve(): Promise<any> {
    this.log.log(ComponentName.DEACTIVATION_LOGIN_REGISTRATION_GUARDER, `canDeactivate(): retrieve()`);
    return new Promise((resolve) => {
      this.retrieveDataResolverDRG = resolve;
      this.setIsCanDeactivate();
    });
  }
  private setIsCanDeactivate(): void {
    this.isCanDeactivate = true;
    this.retrieveDataResolverDRG();
  }
  private afterPromise() {
    this.log.log(ComponentName.DEACTIVATION_LOGIN_REGISTRATION_GUARDER, `canDeactivate(): afterPromise()`);
    // this.router.navigate(['register']);
    this.router.navigate(['register'], { queryParams: { returnUrl: '/' + this.routeSnapshot.url }});
    // location.reload();
  }
// End CANDEACTIVATE

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = true;
    }
  }
}


// @HostListener('window:beforeunload', ['$event'])
// unloadNotification($event: any) {
//   if (window.onpagehide || window.onpagehide === null) {
//     if (!this.canDeactivate()) {
//       $event.returnValue = true;
//     }
//   }
// }
