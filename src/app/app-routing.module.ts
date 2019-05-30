import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration/registration.component';
import {HomeComponent} from './home/home.component';
import {ValueCompatibilityComponent} from './testing/value-compatibility/value-compatibility.component';
import {MatchValueCompatibilityComponent} from './matching/match-value-compatibility/match-value-compatibility.component';
import {LoginComponent} from './login/login/login.component';
import {ValueCompatibilityProfileComponent} from './testing/value-compatibility-profile/value-compatibility-profile.component';
import {SendingTokensComponent} from './common-components/sending-tokens/sending-tokens.component';
import {AboutProjectComponent} from './about-project/about-project.component';
import {ErrorPageComponent} from './common-components/error-page/error-page.component';
import {CardComponent} from './card/card.component';
import {TestHomePageComponent} from './testing/test-home-page/test-home-page.component';
import {PsychologicalCompatibilityInfoComponent} from './psychological-compatibility-info/psychological-compatibility-info.component';
import {UserAccountComponent} from './profile/user-account/user-account.component';
import {AnonimRegistrationComponent} from './registration/anonim-registration/anonim-registration.component';
import {TestFriendComponent} from './common-components/test-friend/test-friend.component';
import {AuthGuard} from './auth.guard';
import {RegistrationGuard} from './guard/registration.guard';
import {AnonimRegistrationGuard} from './guard/anonim-registration.guard';
import {CanDeactivateGuard} from './guard/can-deactivate.guard';
import {MatchHomePageComponent} from './matching/match-home-page/match-home-page.component';

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

  {
    path: 'account',
    component: UserAccountComponent,
    canActivate: [AuthGuard]
  },

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
    component: ValueCompatibilityProfileComponent,
    canActivate: [AnonimRegistrationGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'match-home',
    component: MatchHomePageComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'match',
    component: MatchValueCompatibilityComponent,
    // canActivate: [AuthGuard, RegistrationGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'tokens',
    component: SendingTokensComponent,
    canActivate: [AnonimRegistrationGuard]
  },
  {
    path: 'test-friend',
    component: TestFriendComponent,
    canActivate: [AnonimRegistrationGuard]
  },
  {
    path: 'anonim-registration',
    component: AnonimRegistrationComponent
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
