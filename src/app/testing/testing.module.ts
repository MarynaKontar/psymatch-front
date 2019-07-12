import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValueCompatibilityComponent } from './value-compatibility/value-compatibility.component';
import { ValueCompatibilityService } from './value-compatibility.service';
import { ValueCompatibilityProfileComponent } from './value-compatibility-profile/value-compatibility-profile.component';
import { TestHomePageComponent } from './test-home-page/test-home-page.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { AppRoutingModule } from '../app-routing.module';
import { ValueCompatibilityTestInctructionComponent } from './value-compatibility-test-inctruction/value-compatibility-test-inctruction.component';
import {AuthModule} from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    CommonComponentsModule,
    AppRoutingModule,
    AuthModule
  ],
  declarations: [ValueCompatibilityComponent, ValueCompatibilityProfileComponent,
                 TestHomePageComponent, ValueCompatibilityTestInctructionComponent],
  exports: [TestHomePageComponent],
  providers: [ValueCompatibilityService]
})
export class TestingModule { }
