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
import {httpInterceptorProviders} from './http-interceptors/interceptors';
import { SendingTokensComponent } from './sending-tokens/sending-tokens.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutProjectComponent,
    HowItWorksComponent,
    ErrorPageComponent,
    CardComponent,
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
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
