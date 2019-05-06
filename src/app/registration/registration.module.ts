import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from '@angular/forms';
import {RegistrationService} from './registration.service';
import { AnonimRegistrationComponent } from './anonim-registration/anonim-registration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [RegistrationComponent, AnonimRegistrationComponent],
  declarations: [RegistrationComponent, AnonimRegistrationComponent, AnonimRegistrationComponent],
  providers: [RegistrationService]
})
export class RegistrationModule { }
