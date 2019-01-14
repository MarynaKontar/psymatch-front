import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from '@angular/forms';
import { AgeGenderRegistrationComponent } from './age-gender-registration/age-gender-registration.component';
import {RegistrationService} from './registration.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [RegistrationComponent, AgeGenderRegistrationComponent],
  declarations: [RegistrationComponent, AgeGenderRegistrationComponent],
  providers: [RegistrationService]
})
export class RegistrationModule { }
