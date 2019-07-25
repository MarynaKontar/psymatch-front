import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserAccount} from '../../../profile/user';
import {RegistrationService} from '../registration.service';
import {LoginService} from '../../authentication/login.service';
import {UserAccountService} from '../../../profile/user-account.service';
import {LogService} from '../../../common-components/services/log.service';
import {ComponentName} from '../../../common-components/services/component-name';

@Component({
  selector: 'app-anonim-registration',
  templateUrl: './anonim-registration.component.html',
  styleUrls: ['./anonim-registration.component.scss']
})
export class AnonimRegistrationComponent implements OnInit {

  @ViewChild('openModalAnonimRegistration') openModal: ElementRef; // in html <button id="openModalAnonimRegistration" ...>
  @ViewChild('closeBtn') closeBtn: ElementRef;
  registeredUser = new User();
  user1 = new User();
  isAnonimRegistered = false;
  isVisible;
  isRegistrationError;
  private userAccount: UserAccount;
  private returnUrl: string;
  private retrieveDataResolver;
  constructor(private registrationService: RegistrationService,
              private loginService: LoginService,
              private userAccountService: UserAccountService,
              private router: Router,
              private route: ActivatedRoute,
              private log: LogService) { }

  ngOnInit() {
    this.log.log(ComponentName.ANONIM_REGISTRATION, ` ngOnInit`);
    this.isVisible = (this.loginService.isValueCompatibilityTestPassed() &&
                    !this.registrationService.isAnonimRegistered());
    this.log.log(ComponentName.ANONIM_REGISTRATION, ` ngOnInit: isVisible: ${this.isVisible}`);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.log.log(ComponentName.ANONIM_REGISTRATION, ` ngOnInit: returnUrl: ${this.returnUrl}`);
    if (this.isVisible) {
      this.openModal.nativeElement.click(); // @ViewChild
    } else { this.router.navigateByUrl(this.returnUrl); }
  }

  saveAnonim() {
    this.log.log(ComponentName.ANONIM_REGISTRATION, ` saveAnonim()`);
    this.saveAnonimPromise().then(() => { this.afterSaveAnonimActions(); });
  }

  setAnonimRegistered() {
    this.log.log(ComponentName.ANONIM_REGISTRATION, ` setAnonimRegistered()`);
    this.registrationService.setIsAnonimRegistered(this.registeredUser);
  }

  private afterSaveAnonimActions() {
    return new Promise((resolver) => {
      this.log.log(ComponentName.ANONIM_REGISTRATION, ` afterSaveAnonimActions(): reload`);
      location.reload();
    });
  }

  private saveAnonimPromise(): Promise<any> {
    this.log.log(ComponentName.ANONIM_REGISTRATION, ` saveAnonimPromise()`);
    return new Promise((resolver) => {
      this.retrieveDataResolver = resolver;
      this.saveAnonimServer();
    });
  }

  private saveAnonimServer() {
    this.log.log(ComponentName.ANONIM_REGISTRATION, ` saveAnonimServer()`);
    this.registrationService.anonimRegistration(<User> this.registeredUser)
      .subscribe(data => {
          this.log.log(ComponentName.ANONIM_REGISTRATION, ` saveAnonimServer(): ${data}`);
          this.closeBtn.nativeElement.click();
          this.registeredUser = data;
          this.setAnonimRegistered();
          this.userAccount = this.userAccountService.getUserAccount();
          this.user1 = this.userAccount.user;
          this.user1.name = this.registeredUser.name;
          this.user1.age = this.registeredUser.age;
          this.user1.gender = this.registeredUser.gender;
          this.userAccount.user = this.user1;
          this.userAccountService.setUserAccount(this.userAccount);
          this.isAnonimRegistered = this.registrationService.isAnonimRegistered();
          this.retrieveDataResolver();
        },
        error => {
          this.log.log(ComponentName.ANONIM_REGISTRATION, ` saveAnonimServer(): error: ${error}`);
          this.isRegistrationError = true;
        });
  }
}
