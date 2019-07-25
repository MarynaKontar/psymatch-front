import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../auth/authentication/login.service';
import {UserAccountService} from '../../profile/user-account.service';
import {LogService} from '../services/log.service';
import {ComponentName} from '../services/component-name';

@Component({
  selector: 'app-test-friend-button',
  templateUrl: './test-friend-button.component.html',
  styleUrls: ['./test-friend-button.component.scss']
})
export class TestFriendButtonComponent implements OnInit {
  isVisible: boolean = false;
  constructor(private loginService: LoginService,
              private userAccountService: UserAccountService,
              private log: LogService) { }

  ngOnInit() {
    this.log.log(ComponentName.TEST_FRIEND_BUTTON, ` ngOnInit`);
    this.isVisible = this.loginService.isValueCompatibilityTestPassed() && !this.userAccountService.isUserForMatchingToken();
  }

}
