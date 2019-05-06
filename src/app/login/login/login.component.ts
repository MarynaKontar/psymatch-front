import { Component, OnInit } from '@angular/core';
import {User, UserAccount} from '../../profile/user';
import {LoginService} from '../login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from '../../registration/registration.service';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SendingTokensService} from '../../common-components/sending-tokens/sending-tokens.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  userAccount: UserAccount = new UserAccount();
  retrieveDataResolver;
  isLoginError;
  returnUrl: string;
  constructor(private loginService: LoginService,
              private registrationService: RegistrationService,
              private sendingTokensService: SendingTokensService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.loginService.isLogin()) {this.router.navigate(['/'])}
  }

  // !!!!!!!!!!!!!!!!!!!! sequential (последовательное) execution of functions loginPromise() and afterLoginActions() !!!!!!!!!!!!!!!!!!
  login() {
    // SYNCHRONOUS: doing a serial sequence of async tasks with PROMISE, using chaining "then" calls.
    // without Promise, all commands async, and there is can be "reload" before retrieve data from server
    this.loginPromise().then(() => { this.afterLoginActions(); });
  }

  private afterLoginActions(): void {
    console.log('afterLoginActions');
    // location.reload(); // need to reload because there will be seen Login and Register on header without reload
    console.log('returnUrl: ', this.returnUrl);
    this.router.navigateByUrl(this.returnUrl); // if replace to afterLoginActions(), reload to login page? not to home page
    console.log(this.userAccount);
  }
  private loginServer(): void {
    // reset login status
    this.logout();
    this.loginService.login(this.user)
      .subscribe(userAccount => {
          this.userAccount = userAccount.body;
          console.log(userAccount);
          this.loginService.setUserAccount(userAccount.body);
          this.saveTokenToLocalStorage(userAccount);
          this.setIsAnonimRegistered();
          this.setIsRegistered();
          this.isValueCompatibilityTestPassed(userAccount);
          this.sendingTokensService.setFriendsTokens(userAccount.body.inviteTokens);
          this.retrieveDataResolver();
        },
        error => {
        this.isLoginError = true;
          // login failed so display error

        });
  }
  private loginPromise(): Promise<any> {
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.loginServer();
    });
  }



  private setIsAnonimRegistered() {
    this.registrationService.setIsAnonimRegistered(this.userAccount.user);
  }
  private saveTokenToLocalStorage(httpResponse: HttpResponse<UserAccount>) {
    this.loginService.saveTokenToLocalStorage(httpResponse);
  }
  private setIsRegistered() {
    this.registrationService.setIsRegistered(this.userAccount.user);
  }

  private isValueCompatibilityTestPassed(userAccount: HttpResponse<UserAccount>) {
    return this.loginService.setIsValueCompatibilityTestPassed(userAccount);
  }

  logout() {
    this.loginService.logout();
  }

}

