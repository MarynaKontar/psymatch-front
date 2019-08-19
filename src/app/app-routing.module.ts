import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ValueCompatibilityComponent} from './testing/value-compatibility/value-compatibility.component';
import {MatchValueCompatibilityComponent} from './matching/match-value-compatibility/match-value-compatibility.component';
import {ValueCompatibilityProfileComponent} from './testing/value-compatibility-profile/value-compatibility-profile.component';
import {SendingTokensComponent} from './common-components/sending-tokens/sending-tokens.component';
import {AboutProjectComponent} from './about-project/about-project.component';
import {ErrorPageComponent} from './common-components/error-page/error-page.component';
import {TestHomePageComponent} from './testing/test-home-page/test-home-page.component';
import {PsychologicalCompatibilityInfoComponent} from './psychological-compatibility-info/psychological-compatibility-info.component';
import {UserAccountComponent} from './profile/user-account/user-account.component';
import {TestFriendComponent} from './common-components/test-friend/test-friend.component';
import {AuthGuard} from './guard/auth.guard';
import {IncompleteRegistrationGuard} from './guard/incomplete-registration.guard';
import {CanDeactivateGuard} from './guard/can-deactivate.guard';
import {MatchHomePageComponent} from './matching/match-home-page/match-home-page.component';
import {ValueCompatibilityTestInctructionComponent} from './testing/value-compatibility-test-inctruction/value-compatibility-test-inctruction.component';
import {RegistrationComponent} from './auth/registration/registration/registration.component';
import {LoginComponent} from './auth/authentication/login/login.component';
import {LogoutComponent} from './auth/authentication/logout/logout.component';
import {IncompleteRegistrationComponent} from './auth/registration/incomplete-registration/incomplete-registration.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
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
    path: 'incomplete-registration',
    component: IncompleteRegistrationComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'logout',
    component: LogoutComponent
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
    path: 'vc-test-instruction',
    component: ValueCompatibilityTestInctructionComponent
  },
  {
    path: 'value-compatibility-test',
    component: ValueCompatibilityComponent
  },
  {
    path: 'value-profile',
    component: ValueCompatibilityProfileComponent,
    canActivate: [IncompleteRegistrationGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'match-home',
    component: MatchHomePageComponent,
  },
  {
    path: 'match',
    component: MatchValueCompatibilityComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'tokens',
    component: SendingTokensComponent,
    canActivate: [IncompleteRegistrationGuard]
  },
  {
    path: 'test-friend',
    component: TestFriendComponent,
    canActivate: [IncompleteRegistrationGuard],
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: 'psychological-compatibility-info',
    component: PsychologicalCompatibilityInfoComponent
  },
  {
    path: '**',
    redirectTo: '/user-test'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  // imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
