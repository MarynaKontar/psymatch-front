import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule} from '@angular/forms';
import {RegistrationService} from './registration.service';
import { AnonimRegistrationComponent } from './anonim-registration/anonim-registration.component';
import {LoginModule} from '../login/login.module';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    LoginModule,
  ],
  exports: [RegistrationComponent, AnonimRegistrationComponent],
  declarations: [RegistrationComponent, AnonimRegistrationComponent],
  providers: [RegistrationService]
})
export class RegistrationModule { }
