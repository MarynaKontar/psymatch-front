import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration/registration.component';
import {HomeComponent} from './home/home.component';
import {ValueCompatibilityComponent} from './testing/value-compatibility/value-compatibility.component';
import {MatchValueCompatibilityComponent} from './matching/match-value-compatibility/match-value-compatibility.component';
import {LoginComponent} from './login/login/login.component';
import {ValueCompatibilityProfileComponent} from './testing/value-compatibility-profile/value-compatibility-profile.component';
import {SendingTokensComponent} from './common-components/sending-tokens/sending-tokens.component';
import {AgeGenderRegistrationComponent} from './registration/age-gender-registration/age-gender-registration.component';
import {AboutProjectComponent} from './about-project/about-project.component';
import {ErrorPageComponent} from './common-components/error-page/error-page.component';
import {CardComponent} from './card/card.component';
import {TestHomePageComponent} from './testing/test-home-page/test-home-page.component';
import {PsychologicalCompatibilityInfoComponent} from './psychological-compatibility-info/psychological-compatibility-info.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // children: [
    //   { path: '', component: HomeComponent, pathMatch: 'full'},
    //   { path: 'about', component: AboutComponent },
    //   { path: 'test/:id', component: AboutComponent }
    // ]
  },
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'about-project',
    component: AboutProjectComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  // {
  //   path: 'profile',
  //   component: UserComponent
  // },
  //
  {
    path: 'user-test',
    component: TestHomePageComponent
  },
  {
    path: 'value-compatibility-test',
    component: ValueCompatibilityComponent
  },
  {
    path: 'value-profile',
    component: ValueCompatibilityProfileComponent
  },
  {
    path: 'match',
    component: MatchValueCompatibilityComponent
  },
  {
    path: 'tokens',
    component: SendingTokensComponent
  },
  {
    path: 'age-gender-registration',
    component: AgeGenderRegistrationComponent
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: 'card',
    component: CardComponent
  },
  {
    path: 'psychological-compatibility-info',
    component: PsychologicalCompatibilityInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
