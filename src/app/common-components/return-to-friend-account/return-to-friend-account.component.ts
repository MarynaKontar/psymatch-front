import { Component, OnInit } from '@angular/core';
import {User} from '../../profile/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAccountService} from '../../profile/user-account.service';
import {RegistrationService} from '../../auth/registration/registration.service';
import {LoginService} from '../../auth/authentication/login.service';
import {SendingTokensService} from '../sending-tokens/sending-tokens.service';
import {ComponentName} from '../services/component-name';
import {LogService} from '../services/log.service';

@Component({
  selector: 'app-return-to-friend-account',
  templateUrl: './return-to-friend-account.component.html',
  styleUrls: ['./return-to-friend-account.component.scss']
})
export class ReturnToFriendAccountComponent implements OnInit {
// RETURN TO FRIEND TOKEN
  ifUserForMatchingToken;
  retrieveDataResolver;
  isLoginError: boolean;
  returnUrl: string;

  isRegistered;

  constructor(private loginService: LoginService,
              private registrationService: RegistrationService,
              private userAccountService: UserAccountService,
              private sendingTokensService: SendingTokensService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private log: LogService) {
  }

  ngOnInit() {
    this.log.log(ComponentName.RETURN_TO_FRIEND_ACCOUNT, `onInit`);
    this.isRegistered = this.registrationService.isRegistered();
    // RETURN TO FRIEND ACCOUNT
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/match';
    this.ifUserForMatchingToken = this.userAccountService.isUserForMatchingToken();
  }

// RETURN TO FRIEND ACCOUNT
  returnToFriendAccount() {
    this.log.log(ComponentName.RETURN_TO_FRIEND_ACCOUNT, `method`);
    this.returnToFriendAccountPromise().then(() => { this.afterReturnToFriendAccountActions(); });
  }

  private returnToFriendAccountPromise(): Promise<any> {
    this.log.log(ComponentName.RETURN_TO_FRIEND_ACCOUNT, `returnToFriendAccountPromise()`);
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.returnToFriendAccountServer();
    });
  }

  private returnToFriendAccountServer() {
    this.log.log(ComponentName.RETURN_TO_FRIEND_ACCOUNT, `returnToFriendAccountServer()`);
    this.loginService.returnToFriendAccount()
      .subscribe(userAccount => {
          this.loginService.logout();
          this.loginService.setUserAccount(userAccount.body);
          this.loginService.saveTokenToLocalStorage(userAccount);
          const user: User = userAccount.body.user;
          this.registrationService.setIsAnonimRegistered(user);
          this.registrationService.setIsRegistered(user);
          this.loginService.setIsValueCompatibilityTestPassed(userAccount.body);
          this.sendingTokensService.setFriendsTokens(userAccount.body.inviteTokens);
          this.retrieveDataResolver();
        },
        error => {
          this.log.log(ComponentName.RETURN_TO_FRIEND_ACCOUNT, `returnToFriendAccountServer() - error: ${error}`);
          this.isLoginError = true;
          // login failed so display error

        });
  }

  private afterReturnToFriendAccountActions() {
    this.log.log(ComponentName.RETURN_TO_FRIEND_ACCOUNT, `afterReturnToFriendAccountActions(): returnUrl: ${this.returnUrl}`);
    this.router.navigateByUrl(this.returnUrl);
    location.reload();
  }

}
