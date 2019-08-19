import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../auth/authentication/login.service';

@NgModule({
  imports: [
    CommonModule,
    LoginService,
  ],
  // declarations: [RegistrationGuard, IncompleteRegistrationGuard, CanDeactivateGuard],
  // exports: [RegistrationGuard, IncompleteRegistrationGuard, CanDeactivateGuard],
  // providers: [CanDeactivateGuard]
})
export class GuardModule { }
