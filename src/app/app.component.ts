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
export class AppComponent  {
  title = 'app';
  constructor() { }
}
