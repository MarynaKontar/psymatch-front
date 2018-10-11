import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchValueCompatibilityComponent } from './match-value-compatibility/match-value-compatibility.component';
import {MatchValueCompatibilityService} from './match-value-compatibility.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MatchValueCompatibilityComponent],
  providers: [MatchValueCompatibilityService]
})
export class MatchingModule { }
