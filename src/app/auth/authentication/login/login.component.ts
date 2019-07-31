import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User, UserAccount} from '../../../profile/user';
import {LoginService} from '../login.service';
import {RegistrationService} from '../../registration/registration.service';
import {HttpResponse} from '@angular/common/http';
import {SendingTokensService} from '../../../common-components/sending-tokens/sending-tokens.service';
import {ComponentName} from '../../../common-components/services/component-name';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PASSWORD_LENGTH} from '../../auth-constant';
import {LogService} from '../../../common-components/services/log.service';
import {ActivatedRoute, Router} from '@angular/router';
import {APP_NAME} from '../../../utils/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('openModalLogin') openModalLogin: ElementRef;
  loginForm: FormGroup;
  user: User = new User();
  userAccount: UserAccount = new UserAccount();
  readonly APP_NAME = `${APP_NAME}`;
  retrieveDataResolver;
  retrieveDataResolver1;
  isLoginError;
  returnUrl: string;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(private loginService: LoginService,
              private registrationService: RegistrationService,
              private sendingTokensService: SendingTokensService,
              private log: LogService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.log.log(ComponentName.LOGIN, ` ngOnInit`);

    // если на страницу логирования перебрасывает с auth.guard (navigate(['login'], { queryParams: { returnUrl: state.url }})), то модальное окно само по себе не откроется
    // поэтому открываем вручную
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (this.returnUrl) { this.openModalLogin.nativeElement.click(); }
    this.log.log(ComponentName.LOGIN, ` ngOnInit: returnUrl: ${this.returnUrl}`);


    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]), // , Validators.email
      'password': new FormControl(null, [Validators.required, Validators.minLength(PASSWORD_LENGTH)]),
    });
  }

  // !!!!!!!!!!!!!!!!!!!! sequential (последовательное) execution of functions loginPromise() and afterLoginActions() !!!!!!!!!!!!!!!!!!
  login() {
    this.log.log(ComponentName.LOGIN, ` login: email/name: ${this.loginForm.controls['email'].value}`);
    // console.log(this.loginForm);
    this.user.name = this.loginForm.controls['email'].value;
    this.user.password = this.loginForm.controls['password'].value;
    this.loginPromise().then(() => { this.afterLoginActions(); });
  }

  private afterLoginActions(): void {
    this.log.log(ComponentName.LOGIN, ` login(): afterLoginActions(): userAccount: ${this.userAccount}`);

    // если на страницу логирования перебрасывает с auth.guard
     if (this.returnUrl) {
       this.log.log(ComponentName.LOGIN, ` login(): afterLoginActions(): navigateByUrl: ${this.returnUrl}`);
       new Promise((resolve) => {
         this.retrieveDataResolver1 = resolve;
         this.router.navigateByUrl(this.returnUrl);
         this.retrieveDataResolver1();
       }).then(() => {
         location.reload();
       });
       // написать общий сервис для передачи user name из этого модуля в header.component
     } else {
       if (location.pathname === '/value-profile' ||
         location.pathname === '/match-home' ||
         location.pathname === '/match') {
         this.log.log(ComponentName.LOGIN, ` login(): afterLoginActions(): location: ${location.pathname} => reload`);
         location.reload(); // в любом случае перезагрузить так как должны новые данные подгрузиться
       } else {
         // написать общий сервис для передачи user name из этого модуля в header.component
         this.log.log(ComponentName.LOGIN, ` login(): afterLoginActions(): reload`);
         location.reload();
       }
     }

  }

  private loginServer(): void {
    this.logout();
    this.loginService.login(this.user)
      .subscribe(userAccount => {
          this.closeModal();
          this.userAccount = userAccount.body;
          this.log.log(ComponentName.LOGIN, ` login(): loginServer(): userAccount: ${userAccount.body}`);
          this.loginService.setUserAccount(userAccount.body);
          this.saveTokenToLocalStorage(userAccount);
          this.setIsAnonimRegistered();
          this.setIsRegistered();
          this.isValueCompatibilityTestPassed(userAccount.body);
          this.sendingTokensService.setFriendsTokens(userAccount.body.inviteTokens);
          this.retrieveDataResolver();
        },
        error => {
          this.log.log(ComponentName.LOGIN, ` login(): loginServer(): error: ${error}`);
          this.isLoginError = true;
        });
  }
  private loginPromise(): Promise<any> {
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.loginServer();
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
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

  private isValueCompatibilityTestPassed(userAccount: UserAccount) {
    return this.loginService.setIsValueCompatibilityTestPassed(userAccount);
  }

  logout() {
    this.loginService.logout();
  }

  register() {
    this.closeModal();
    this.router.navigate(['register']);
  }

}

