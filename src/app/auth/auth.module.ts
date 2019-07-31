import {NgModule} from '@angular/core';
import {AuthenticationModule} from './authentication/authentication.module';
import {RegistrationModule} from './registration/registration.module';
import {LoginComponent} from './authentication/login/login.component';
import {LogoutComponent} from './authentication/logout/logout.component';
import {RegistrationComponent} from './registration/registration/registration.component';


@NgModule({
  imports: [
    AuthenticationModule,
    RegistrationModule,
  ],
  declarations: [
  ],
  exports: [
    // к LoginComponent, LogoutComponent переходим из основного компонента по <app-login> и <app-logout>
    // вызывая открытие модального окна. поэтому их надо экспортировать.
    // А к AnonimRegistration переходим по routerLink и поэтому его не надо экспортировать.
    // К RegistrationComponent тоже переходим везде по routerLink, но в user-account вставляем
    // в шаблон страницу регистрации, поэтому приходится тоже экспортировать
    LoginComponent,
    LogoutComponent,
    RegistrationComponent
    ],
  providers: [ ]
})
export class AuthModule {}
