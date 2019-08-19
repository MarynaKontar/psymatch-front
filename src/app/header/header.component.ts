import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../auth/registration/registration.service';
import {LoginService} from '../auth/authentication/login.service';
import {UserAccount} from '../profile/user';
import {UserAccountService} from '../profile/user-account.service';
import {LogService} from '../common-components/services/log.service';
import {APP_NAME} from '../utils/config';
import {ComponentName} from '../common-components/services/component-name';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly APP_NAME = `${APP_NAME}`;

  isRegistered: boolean;
  isIncompleteRegistered: boolean;
  isLogin: boolean;
  isValueCompatibilityTestPassed: boolean;
  account: UserAccount;
  isAccountUserName;
  isAccountVisible; // 'is userAccount.user.name'
  isAliasAccountVisible; // 'Account'

  constructor(private registrationService: RegistrationService,
              private loginService: LoginService,
              private userAccountService: UserAccountService,
              private log: LogService) {
  }

  ngOnInit() {
    this.log.log(ComponentName.HEADER, ` ngOnInit`);
    this.isLogin = this.loginService.isLogin();
    this.isRegistered = this.registrationService.isRegistered();
    const isUserAccount = this.userAccountService.isUserAccount();
    this.account = this.userAccountService.getUserAccount();
    this.isAccountUserName = isUserAccount &&
                             this.account.user !== null &&
                             this.account.user.name !== null;
    this.isIncompleteRegistered = this.registrationService.isIncompleteRegistered();
    this.isValueCompatibilityTestPassed = this.loginService.isValueCompatibilityTestPassed();

    this.log.log(ComponentName.HEADER, ` ngOnInit: isLogin: ${this.isLogin}`);
    this.log.log(ComponentName.HEADER, ` ngOnInit: isRegistered: ${this.isRegistered}`);
    this.log.log(ComponentName.HEADER, ` ngOnInit: isAccountUserName: ${this.isAccountUserName}`);
    this.log.log(ComponentName.HEADER, ` ngOnInit: isIncompleteRegistered: ${this.isIncompleteRegistered}`);
    this.log.log(ComponentName.HEADER, ` ngOnInit: isValueCompatibilityTestPassed: ${this.isValueCompatibilityTestPassed}`);

    this.isAccountVisible = (this.isLogin && this.isRegistered && this.isAccountUserName)
      || (this.isLogin && this.isIncompleteRegistered && this.isAccountUserName)
      || (this.isLogin && this.isRegistered && this.isIncompleteRegistered && this.isAccountUserName);

    this.isAliasAccountVisible = (this.isLogin && this.isIncompleteRegistered && !this.isAccountUserName) ||
      (this.isLogin && this.isRegistered && !this.isAccountUserName) ||
      (this.isLogin && this.isRegistered && this.isIncompleteRegistered && !this.isAccountUserName);

    this.log.log(ComponentName.HEADER, ` ngOnInit: isAccountVisible: ${this.isAccountVisible}`);
    this.log.log(ComponentName.HEADER, ` ngOnInit: isAliasAccountVisible: ${this.isAliasAccountVisible}`);
  }
}
