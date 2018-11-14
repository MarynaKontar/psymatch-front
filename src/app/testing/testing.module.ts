import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueCompatibilityComponent } from './value-compatibility/value-compatibility.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ValueCompatibilityService} from './value-compatibility.service';
import { ValueCompatibilityProfileComponent } from './value-compatibility-profile/value-compatibility-profile.component';
// import {MatButtonModule, MatStepperModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // MatButtonModule,
    // MatStepperModule
  ],
  declarations: [ValueCompatibilityComponent, ValueCompatibilityProfileComponent],
  providers: [ValueCompatibilityService]
})
export class TestingModule { }
