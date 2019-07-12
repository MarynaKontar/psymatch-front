import {Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {RegistrationService} from '../auth/registration/registration.service';
import {LoginService} from '../auth/authentication/login.service';
import {UserAccount} from '../profile/user';
import {UserAccountService} from '../profile/user-account.service';
import {LogService} from '../common-components/services/log.service';
import {APP_NAME} from '../utils/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly APP_NAME = `${APP_NAME}`;

  isRegistered: boolean;
  isAnonimRegistered: boolean;
  isLogin: boolean;
  isValueCompatibilityTestPassed: boolean;
  account: UserAccount;
  isAccountUserName;
  isAccountVisible; // 'userAccount.user.name'
  isAliasAccountVisible; // 'Account'

  constructor(private registrationService: RegistrationService,
              private loginService: LoginService,
              private userAccountService: UserAccountService,
              private log: LogService) {
  }

  ngOnInit() {
    this.isLogin = this.loginService.isLogin();
    this.isRegistered = this.registrationService.isRegistered();
    this.isAccountUserName = this.userAccountService.isUserAccount()
      && this.userAccountService.getUserAccount().user !== null
      && this.userAccountService.getUserAccount().user.name !== null;
    this.isAnonimRegistered = this.registrationService.isAnonimRegistered();
    this.isValueCompatibilityTestPassed = this.loginService.isValueCompatibilityTestPassed();
    if (this.isAccountUserName) {
      this.account = this.userAccountService.getUserAccount();
    }

    this.isAccountVisible = (this.isLogin && this.isRegistered && this.isAccountUserName)
      || (this.isLogin && this.isAnonimRegistered && this.isAccountUserName)
      || (this.isLogin && this.isRegistered && this.isAnonimRegistered && this.isAccountUserName);

    this.isAliasAccountVisible = (this.isLogin && this.isAnonimRegistered && !this.isAccountUserName) ||
      (this.isLogin && this.isRegistered && !this.isAccountUserName) ||
      (this.isLogin && this.isRegistered && this.isAnonimRegistered && !this.isAccountUserName);
  }
}
