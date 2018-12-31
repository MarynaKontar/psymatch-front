import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {RegistrationModule} from '../registration/registration.module';
import {LoginService} from './login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
