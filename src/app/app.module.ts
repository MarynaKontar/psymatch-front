import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProfileModule } from './profile/profile.module';
import { TestingModule } from './testing/testing.module';
import { MatchingModule } from './matching/matching.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './http-interceptors/interceptors';
import { AboutProjectComponent } from './about-project/about-project.component';
import { AuthorCardsComponent } from './author-cards/author-cards.component';
import { CommonComponentsModule } from './common-components/common-components.module';
import { PsychologicalCompatibilityInfoComponent } from './psychological-compatibility-info/psychological-compatibility-info.component';
import { PaginationService } from './pagination/pagination.service';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutProjectComponent,
    AuthorCardsComponent,
    PsychologicalCompatibilityInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    TestingModule,
    MatchingModule,
    ProfileModule,
    CommonComponentsModule,
  ],
  providers: [
    httpInterceptorProviders,
    PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
