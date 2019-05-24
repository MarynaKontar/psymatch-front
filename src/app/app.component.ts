import { Component } from '@angular/core';
import {DeactivationGuarded} from './guard/can-deactivate.guard';
import {Observable} from 'rxjs';
import {RegistrationService} from './registration/registration.service';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends DeactivationGuarded {
  title = 'app';
  constructor(private registrationService: RegistrationService,
              private loginService: LoginService) {
    super();
  }
  // if the user is not registered, warn that some information may not be saved (see unloadNotification method in DeactivationGuard)
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.isLogin() && this.registrationService.isRegistered();
  }
}
