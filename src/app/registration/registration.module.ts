import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from '@angular/forms';
import { AgeSexRegistrationComponent } from './age-gender-registration/age-gender-registration.component';
import {RegistrationService} from './registration.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [RegistrationComponent, AgeSexRegistrationComponent],
  declarations: [RegistrationComponent, AgeSexRegistrationComponent],
  providers: [RegistrationService]
})
export class RegistrationModule { }
