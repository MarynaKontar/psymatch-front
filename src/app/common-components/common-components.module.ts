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
import {LoginModule} from '../login/login.module';
import { TestFriendButtonComponent } from './test-friend-button/test-friend-button.component';
import { TestFriendComponent } from './test-friend/test-friend.component';
import { ReturnToFriendAccountComponent } from './return-to-friend-account/return-to-friend-account.component';
import {LogService} from './services/log.service';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    LoginModule
  ],
  exports: [TestInfoCardsComponent, ErrorPageComponent, PassTestButtonComponent,
    SendingTokensComponent, HomeHeaderComponent, OnlineAdvertisingComponent,
    TestNotPassedComponent, TestFriendButtonComponent, TestFriendComponent, ReturnToFriendAccountComponent],
  declarations: [TestInfoCardsComponent, ErrorPageComponent, PassTestButtonComponent,
    SendingTokensComponent, HomeHeaderComponent, OnlineAdvertisingComponent,
    TestNotPassedComponent, TestFriendButtonComponent, TestFriendComponent, ReturnToFriendAccountComponent],
  providers: [SendingTokensComponent, LogService]
})
export class CommonComponentsModule { }
