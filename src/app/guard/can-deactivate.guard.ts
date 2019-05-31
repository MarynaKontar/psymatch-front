import {HostListener, Injectable} from '@angular/core';
import {CanDeactivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {RegistrationService} from '../registration/registration.service';
import {LoginService} from '../login/login.service';

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
  constructor(public loginService: LoginService,
              public registrationService: RegistrationService,
              public router: Router) {}
  // CANDEACTIVATE
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.isLogin() && this.registrationService.isRegistered()) {
      console.log('match CanDeactivate true');
      return true;
    } else {
      console.log('match CanDeactivate false');
      // if (!confirm('If you are not registered and will leave the application, your data will be lost. Click Cancel to go to Registration page.')) {
      if (!confirm('Если вы не зарегестрированы и покинете приложение, ваши данные будут потеряны. Нажмите Отмена, чтобы перейти на страницу регистрации.')) {
        console.log('press Cancel');
        this.retrieve().then(() => this.afterPromise());
        return this.isCanDeactivate;
      } else {
        console.log('press Ok');
        return true; }
    }
  }
  private retrieve(): Promise<any> {
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
    this.router.navigate(['register']);
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
