import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestInfoCardsComponent} from './test-info-cards/test-info-cards.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AppRoutingModule} from '../app-routing.module';
import { PassTestButtonComponent } from './pass-test-button/pass-test-button.component';
import {SendingTokensComponent} from './sending-tokens/sending-tokens.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { OnlineAdvertisingComponent } from './online-advertising/online-advertising.component';
import { TestNotPassedComponent } from './test-not-passed/test-not-passed.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [TestInfoCardsComponent, ErrorPageComponent, PassTestButtonComponent,
    SendingTokensComponent, HomeHeaderComponent, OnlineAdvertisingComponent, TestNotPassedComponent],
  declarations: [TestInfoCardsComponent, ErrorPageComponent, PassTestButtonComponent,
    SendingTokensComponent, HomeHeaderComponent, OnlineAdvertisingComponent, TestNotPassedComponent]
})
export class CommonComponentsModule { }
