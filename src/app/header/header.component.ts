import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../registration/registration.service';
import {LoginService} from '../login/login.service';
import {UserAccount} from '../profile/user';
import {UserAccountService} from '../profile/user-account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isRegistered: boolean;
  isAnonimRegistered: boolean;
  isLogin: boolean;
  isValueCompatibilityTestPassed: boolean;
  account: UserAccount;
  isAccount;
  isAccountNotVisible;

  constructor(private registrationService: RegistrationService,
              private loginService: LoginService,
              private userAccountService: UserAccountService) { }

  ngOnInit() {
    this.isRegistered = this.registrationService.isRegistered();
    this.isLogin = this.loginService.isLogin();
    this.isValueCompatibilityTestPassed = this.loginService.isValueCompatibilityTestPassed();
    this.isAccount = localStorage.getItem('userAccount') != null && this.userAccountService.getUserAccount().user !== null;
    this.isAnonimRegistered = this.registrationService.isAnonimRegistered();
    if (this.isAccount) {
      this.account = this.userAccountService.getUserAccount();
    }
    this.isAccountNotVisible = !this.isLogin || (this.isLogin && !this.isAnonimRegistered);
  }

}
