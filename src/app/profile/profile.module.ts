import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserAccountService } from './user-account.service';
import { FormsModule } from '@angular/forms';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { AppRoutingModule } from '../app-routing.module';
import {AuthModule} from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    CommonComponentsModule,
    AuthModule
  ],
  declarations: [UserAccountComponent],
  providers: [UserAccountService]
})
export class ProfileModule { }
