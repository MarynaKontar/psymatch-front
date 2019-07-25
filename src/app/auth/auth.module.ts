import {NgModule} from '@angular/core';
import {AuthenticationModule} from './authentication/authentication.module';
import {RegistrationModule} from './registration/registration.module';
import {LoginComponent} from './authentication/login/login.component';
import {LogoutComponent} from './authentication/logout/logout.component';


@NgModule({
  imports: [
    AuthenticationModule,
    RegistrationModule,
  ],
  declarations: [
  ],
  exports: [
    // к этим компонентам переходим из основного компонента по <app-login> и <app-logout>
    // вызывая открытие модального окна. поэтому их надо экспортировать.
    // А к компонентам регистрации переходим по routerLink и поэтому их не надо экспортировать.
    LoginComponent,
    LogoutComponent,
    ],
  providers: [ ]
})
export class AuthModule {}
