import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { LogoutComponent } from './logout/logout.component';
import {AppRoutingModule} from '../../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [LoginComponent, LogoutComponent],
  exports: [LoginComponent, LogoutComponent],
  providers: [LoginService],
})
export class AuthenticationModule { }
