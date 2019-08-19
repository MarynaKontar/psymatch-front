import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../profile/user';
import {RegistrationService} from '../registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../authentication/login.service';
import {UserAccountService} from '../../../profile/user-account.service';
import {Location} from '@angular/common';
import {PASSWORD_LENGTH} from '../../auth-constant';
import {APP_NAME} from '../../../utils/config';
import {LogService} from '../../../common-components/services/log.service';
import {ComponentName} from '../../../common-components/services/component-name';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  readonly APP_NAME = `${APP_NAME}`;
  @ViewChild('openModalLogin') openModalLogin: ElementRef; // in html <button id="loginModal" ...> in login component
  registeredUser = new User();
  isNeedToBeRegistered = false;
  returnUrl: string;
  isRegistrationError;
  private retrieveDataResolver;
  isRegistered: boolean;
  minPasswordLength = PASSWORD_LENGTH;
  constructor(private registrationService: RegistrationService,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService,
              private userAccountService: UserAccountService,
              private location: Location,
              private log: LogService) { }

  ngOnInit() {
    this.log.log(ComponentName.REGISTRATION, ` ngOnInit`);
    this.isRegistered = !this.isNew();
    this.log.log(ComponentName.REGISTRATION, ` ngOnInit: isRegistered: ${this.isRegistered}`);
    if (!this.isRegistered) {
      if (this.userAccountService.isUserAccount() && this.userAccountService.getUserAccount().user != null) {
        this.log.log(ComponentName.REGISTRATION, ` ngOnInit: userAccount: ${this.userAccountService.getUserAccount()}`);
        let user = this.userAccountService.getUserAccount().user;
        if (user.name != null) { this.registeredUser.name = user.name; }
        if (user.email != null) { this.registeredUser.email = user.email; }
        if (user.gender != null) { this.registeredUser.gender = user.gender; }
        if (user.age != null) { this.registeredUser.age = user.age; }
      }
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.log.log(ComponentName.REGISTRATION, ` ngOnInit: returnUrl: ${this.returnUrl}`);
  }

  registerUser() {
    // SYNCHRONOUS: doing a serial sequence of async tasks with PROMISE, using chaining "then" calls.
    // without Promise, all commands async, and there is can be "navigate" before retrieve data from server
    this.log.log(ComponentName.REGISTRATION, ` registerUser(): `, this.registeredUser);
    this.retrieveUserPromise().then(() => { this.afterSaveUserActions(); });
  }

  isNew(): boolean {
    this.log.log(ComponentName.REGISTRATION, ` isNew(): `, !this.registrationService.isRegistered());
    return !this.registrationService.isRegistered();
  }

  private afterSaveUserActions(): void {
    this.log.log(ComponentName.REGISTRATION, ` afterSaveUserActions()`);
    location.reload(); // need to update account user name in header navigation
  }
  private saveUser(): void {
    this.log.log(ComponentName.REGISTRATION, ` saveUser(): `, this.registeredUser);
    this.registrationService.registration(<User> this.registeredUser)
      .subscribe(data => {
        if (data.headers.get('AUTHORIZATION') != null) {
          this.log.log(ComponentName.REGISTRATION, ` saveUser(): token: ${data.headers.get('AUTHORIZATION')}`);
          this.loginService.saveTokenToLocalStorage(data);
        }
        this.registrationService.setIsRegistered(data.body.user);
        this.registrationService.setIsIncompleteRegistered(data.body.user);
        this.loginService.setIsValueCompatibilityTestPassed(data.body);
        this.registeredUser = data.body.user;
        this.isNeedToBeRegistered = this.isNew();
        this.loginService.setUserAccount(data.body);
        this.isRegistered = true;
        this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
      },
        error => {
          this.log.log(ComponentName.REGISTRATION, ` saveUser(): error: `, error);
          this.isRegistrationError = true;
        });
  }
  private retrieveUserPromise(): Promise<any> {
    this.log.log(ComponentName.REGISTRATION, ` retrieveUserPromise()`);
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.saveUser();
    });
  }

  login() {
    this.log.log(ComponentName.REGISTRATION, ` login()`);
    this.openModalLogin.nativeElement.click(); // @ViewChild
  }
  goBack() {
    this.log.log(ComponentName.REGISTRATION, ` goBack(): ${this.location.path.toString()}`);
    if (this.location.path.toString() === '/register') {
      this.location.go('/home');
    } else {
      this.location.back();
    }
  }
}
