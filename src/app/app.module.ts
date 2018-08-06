import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {RegistrationModule} from './registration/registration.module';
import {ProfileModule} from './profile/profile.module';
import {LoginModule} from './login/login.module';
import {TestingModule} from './testing/testing.module';
import {MatchingModule} from './matching/matching.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RegistrationModule,
    ProfileModule,
    LoginModule,
    TestingModule,
    MatchingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
