import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueCompatibilityComponent } from './value-compatibility/value-compatibility.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ValueCompatibilityService} from './value-compatibility.service';
import { ValueCompatibilityProfileComponent } from './value-compatibility-profile/value-compatibility-profile.component';
import {SendingTokensComponent} from '../sending-tokens/sending-tokens.component';
import {RegistrationModule} from '../registration/registration.module';
import { TestHomePageComponent } from './test-home-page/test-home-page.component';
import {CommonComponentsModule} from '../common-components/common-components.module';
// import {MatButtonModule, MatStepperModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationModule,
    CommonComponentsModule,
    // MatButtonModule,
    // MatStepperModule
  ],
  declarations: [ValueCompatibilityComponent, SendingTokensComponent, ValueCompatibilityProfileComponent, TestHomePageComponent],
  providers: [ValueCompatibilityService]
})
export class TestingModule { }
