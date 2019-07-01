import {Component, DoCheck, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {RegistrationService} from '../registration/registration.service';
import {LoginService} from '../login/login.service';
import {UserAccount} from '../profile/user';
import {UserAccountService} from '../profile/user-account.service';
import {ComponentName} from '../common-components/services/component-name';
import {LogService} from '../common-components/services/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

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
              private log: LogService) { }

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

  ngDoCheck(): void {
    this.log.log(ComponentName.HEADER, `ngDoCheck: `);
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
