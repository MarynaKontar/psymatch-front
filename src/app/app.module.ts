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
import { SendingTokensComponent } from './common-components/sending-tokens/sending-tokens.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ErrorPageComponent } from './common-components/error-page/error-page.component';
import { CardComponent } from './card/card.component';
import { AuthorCardsComponent } from './author-cards/author-cards.component';
import {CommonComponentsModule} from './common-components/common-components.module';
import { PsychologicalCompatibilityInfoComponent } from './psychological-compatibility-info/psychological-compatibility-info.component';
import {AuthGuard} from './auth.guard';
import {LoginService} from './login/login.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutProjectComponent,
    HowItWorksComponent,
    CardComponent,
    AuthorCardsComponent,
    PsychologicalCompatibilityInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RegistrationModule,
    LoginModule,
    TestingModule,
    MatchingModule,
    ProfileModule,
    CommonComponentsModule,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
