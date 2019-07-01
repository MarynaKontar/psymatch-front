import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationGuard} from './registration.guard';
import {AnonimRegistrationGuard} from './anonim-registration.guard';
import {CanDeactivateGuard} from './can-deactivate.guard';
import {LoginService} from '../login/login.service';

@NgModule({
  imports: [
    CommonModule,
    LoginService
  ],
  // declarations: [RegistrationGuard, AnonimRegistrationGuard, CanDeactivateGuard],
  // exports: [RegistrationGuard, AnonimRegistrationGuard, CanDeactivateGuard],
  // providers: [CanDeactivateGuard]
})
export class GuardModule { }
