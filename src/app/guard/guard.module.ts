import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../auth/authentication/login.service';

@NgModule({
  imports: [
    CommonModule,
    LoginService,
  ],
  // declarations: [RegistrationGuard, AnonimRegistrationGuard, CanDeactivateGuard],
  // exports: [RegistrationGuard, AnonimRegistrationGuard, CanDeactivateGuard],
  // providers: [CanDeactivateGuard]
})
export class GuardModule { }
