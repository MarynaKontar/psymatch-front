import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationGuard} from './registration.guard';
import {AnonimRegistrationGuard} from './anonim-registration.guard';
import {CanDeactivateGuard} from './can-deactivate.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RegistrationGuard, AnonimRegistrationGuard, CanDeactivateGuard],
  exports: [RegistrationGuard, AnonimRegistrationGuard, CanDeactivateGuard],
  providers: [CanDeactivateGuard]
})
export class GuardModule { }
