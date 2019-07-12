import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../profile/user';
import {RegistrationService} from '../registration.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../authentication/login.service';
import {UserAccountService} from '../../../profile/user-account.service';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PASSWORD_LENGTH} from '../../../common-components/common-constant';
import {APP_NAME} from '../../../utils/config';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  readonly APP_NAME = `${APP_NAME}`;
  // @ViewChild('openModalRegistration') openModal: ElementRef; // in html <button id="openModalRegistration" ...>
  // @ViewChild('registration') registration: ElementRef;
  @ViewChild('openModalLogin') openModalLogin: ElementRef; // in html <button id="loginModal" ...> in login component
  registrationForm: FormGroup;
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
              private location: Location) { }

  ngOnInit() {
    this.isRegistered = !this.isNew();
    if (!this.isRegistered) {
      // this.openModal.nativeElement.click(); // @ViewChild
      if (this.userAccountService.isUserAccount() && this.userAccountService.getUserAccount().user != null) {
        let user = this.userAccountService.getUserAccount().user;
        if (user.name != null) { this.registeredUser.name = user.name; }
        if (user.email != null) { this.registeredUser.email = user.email; }
        if (user.gender != null) { this.registeredUser.gender = user.gender; }
        if (user.age != null) { this.registeredUser.age = user.age; }
      }
    }
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('returnUrl: ' + this.returnUrl);
  }

  registerUser() {
    // SYNCHRONOUS: doing a serial sequence of async tasks with PROMISE, using chaining "then" calls.
    // without Promise, all commands async, and there is can be "navigate" before retrieve data from server
    console.log('registerUser(): ', this.registeredUser);
    this.retrieveUserPromise().then(() => { this.afterSaveUserActions(); });
  }

  isNew(): boolean {
    console.log('isNew: ' + !this.registrationService.isRegistered());
    return !this.registrationService.isRegistered();
  }

  private afterSaveUserActions(): void {
    // console.log('returnUrl: ' + this.returnUrl);
    // if (this.loginService.isLogin()) {
      location.reload(); // need to update account user name in header navigation
    // this.router.navigate(['register']);
    // this.router.navigateByUrl(this.returnUrl);
    // } else { this.router.navigate(['login']); }

    // !!! Вывести сообщение о регистрации и ссылки на пред. страницу

  }
  private saveUser(): void {
    console.log('saveUser()');
    this.registrationService.registerNewUser(<User> this.registeredUser)
      .subscribe(data => {
        if (data.headers.get('AUTHORIZATION') != null) {
          this.loginService.saveTokenToLocalStorage(data);
        }
        this.registrationService.setIsRegistered(data.body.user);
        this.registrationService.setIsAnonimRegistered(data.body.user);
        this.loginService.setIsValueCompatibilityTestPassed(data.body);
        this.registeredUser = data.body.user;
        this.isNeedToBeRegistered = this.isNew();
        this.loginService.setUserAccount(data.body);
        this.isRegistered = true;
        // this.registration.nativeElement.open();
        this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
      },
        error => {
          this.isRegistrationError = true;
        });
  }
  private retrieveUserPromise(): Promise<any> {
    console.log('retrieveUserPromise()');
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.saveUser();
    });
  }

  login() {
    this.openModalLogin.nativeElement.click(); // @ViewChild
  }
  goBack() {
    // window.location.reload(); // need to update account user name in header navigation
    console.log(this.location.path);
    console.log(this.location.path(false).toString());
    if (this.location.path.toString() === '/register') {
      this.location.go('/home');
    } else {
      this.location.back();
    }
  }
  // close() {
  //   this.registration.nativeElement.hide();
  //   if (this.loginService.isLogin()) {
  //     // location.reload(); // need to update account user name in header navigation
  //     this.router.navigateByUrl(this.returnUrl);
  //   } else { this.router.navigateByUrl('login'); }
  // }
}
