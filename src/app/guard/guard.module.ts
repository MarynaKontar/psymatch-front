import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistrationGuard} from './registration.guard';
import {AnonimRegistrationGuard} from './anonim-registration.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RegistrationGuard, AnonimRegistrationGuard],
  exports: [RegistrationGuard, AnonimRegistrationGuard]
})
export class GuardModule { }
