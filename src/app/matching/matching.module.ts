import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchValueCompatibilityComponent } from './match-value-compatibility/match-value-compatibility.component';
import {MatchValueCompatibilityService} from './match-value-compatibility.service';
import {RegistrationModule} from '../registration/registration.module';
import {CommonComponentsModule} from '../common-components/common-components.module';
import { MatchHomePageComponent } from './match-home-page/match-home-page.component';

@NgModule({
  imports: [
    CommonModule,
    RegistrationModule,
    CommonComponentsModule
  ],
  declarations: [MatchValueCompatibilityComponent, MatchHomePageComponent],
  providers: [MatchValueCompatibilityService]
})
export class MatchingModule { }
