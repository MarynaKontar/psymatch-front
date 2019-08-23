import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserAccount} from '../../../profile/user';
import {RegistrationService} from '../registration.service';
import {LoginService} from '../../authentication/login.service';
import {UserAccountService} from '../../../profile/user-account.service';
import {LogService} from '../../../common-components/services/log.service';
import {ComponentName} from '../../../common-components/services/component-name';

@Component({
  selector: 'app-incomplete-registration',
  templateUrl: './incomplete-registration.component.html',
  styleUrls: ['./incomplete-registration.component.scss']
})
export class IncompleteRegistrationComponent implements OnInit {

  @ViewChild('openModalIncompleteRegistration') openModal: ElementRef; // in html <button id="openModalIncompleteRegistration" ...>
  @ViewChild('closeBtn') closeBtn: ElementRef;
  incompleteRegisteredUser = new User();
  user1 = new User();
  isIncompleteRegistered = false;
  isVisible;
  isRegistrationError;
  private userAccount: UserAccount;
  private returnUrl: string;
  private retrieveDataResolver;
  private registrationError;
  constructor(private registrationService: RegistrationService,
              private loginService: LoginService,
              private userAccountService: UserAccountService,
              private router: Router,
              private route: ActivatedRoute,
              private log: LogService) { }

  ngOnInit() {
    this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` ngOnInit`);
    this.isVisible = (this.loginService.isValueCompatibilityTestPassed() &&
                    !this.registrationService.isIncompleteRegistered());
    this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` ngOnInit: isVisible: ${this.isVisible}`);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` ngOnInit: returnUrl: ${this.returnUrl}`);
    if (this.isVisible) {
      this.openModal.nativeElement.click(); // @ViewChild
    } else { this.router.navigateByUrl(this.returnUrl); }
  }

  saveIncompleteRegisteredUser() {
    this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` saveIncompleteRegistered()`);
    this.saveIncompleteRegisteredUserPromise().then(() => { this.afterSaveIncompleteRegisteredUserActions(); });
  }

  setIncompleteRegistered() {
    this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` setIncompleteRegistered()`);
    this.registrationService.setIsIncompleteRegistered(this.incompleteRegisteredUser);
  }

  private afterSaveIncompleteRegisteredUserActions() {
    return new Promise((resolver) => {
      this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` afterSaveIncompleteRegisteredUserActions(): reload`);
      location.reload();
    });
  }

  private saveIncompleteRegisteredUserPromise(): Promise<any> {
    this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` saveIncompleteRegisteredUserPromise()`);
    return new Promise((resolver) => {
      this.retrieveDataResolver = resolver;
      this.saveIncompleteRegisteredUserServer();
    });
  }

  private saveIncompleteRegisteredUserServer() {
    this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` saveIncompleteRegisteredUserServer()`);
    this.registrationService.incompleteRegistration(<User> this.incompleteRegisteredUser)
      .subscribe(data => {
          this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` saveIncompleteRegisteredUserServer(): `, data);
          this.closeBtn.nativeElement.click();
          this.incompleteRegisteredUser = data;
          this.setIncompleteRegistered();
          this.userAccount = this.userAccountService.getUserAccount();
          this.user1 = this.userAccount.user;
          this.user1.id = this.incompleteRegisteredUser.id;
          this.user1.name = this.incompleteRegisteredUser.name;
          this.user1.age = this.incompleteRegisteredUser.age;
          this.user1.gender = this.incompleteRegisteredUser.gender;
          this.userAccount.user = this.user1;
          this.userAccountService.setUserAccount(this.userAccount);
          this.isIncompleteRegistered = this.registrationService.isIncompleteRegistered();
          this.retrieveDataResolver();
        },
        (error) => {
          this.log.log(ComponentName.INCOMPLETE_REGISTRATION, ` saveIncompleteRegisteredUserServer(): error: `, error);
          this.isRegistrationError = true;
          this.registrationError = error.error.messageError;
        });
  }
}
