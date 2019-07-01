import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SendingTokensComponent} from '../common-components/sending-tokens/sending-tokens.component';
import { UserAccountComponent } from './user-account/user-account.component';
import {UserAccountService} from './user-account.service';
import {FormsModule} from '@angular/forms';
import {CommonComponentsModule} from '../common-components/common-components.module';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    CommonComponentsModule
  ],
  declarations: [UserAccountComponent],
  providers: [UserAccountService]
})
export class ProfileModule { }
