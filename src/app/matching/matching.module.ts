import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchValueCompatibilityComponent } from './match-value-compatibility/match-value-compatibility.component';
import { MatchValueCompatibilityService } from './match-value-compatibility.service';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MatchHomePageComponent } from './match-home-page/match-home-page.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    AppRoutingModule,
  ],
  declarations: [MatchValueCompatibilityComponent, MatchHomePageComponent],
  // exports: [MatchHomePageComponent],
  providers: [MatchValueCompatibilityService]
})
export class MatchingModule { }
