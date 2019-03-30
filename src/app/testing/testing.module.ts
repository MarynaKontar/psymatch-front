import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueCompatibilityComponent } from './value-compatibility/value-compatibility.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ValueCompatibilityService} from './value-compatibility.service';
import { ValueCompatibilityProfileComponent } from './value-compatibility-profile/value-compatibility-profile.component';
import {RegistrationModule} from '../registration/registration.module';
import { TestHomePageComponent } from './test-home-page/test-home-page.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {AppRoutingModule} from '../app-routing.module';
import {LoginModule} from '../login/login.module';
// import {MatButtonModule, MatStepperModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    RegistrationModule,
    LoginModule,
    CommonComponentsModule,
    AppRoutingModule,
    // MatButtonModule,
    // MatStepperModule
  ],
  declarations: [ValueCompatibilityComponent, ValueCompatibilityProfileComponent, TestHomePageComponent],
  exports: [TestHomePageComponent],
  providers: [ValueCompatibilityService]
})
export class TestingModule { }
