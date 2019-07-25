import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Gender, User, UserAccount} from '../user';
import {UserAccountService} from '../user-account.service';
import {LoginService} from '../../auth/authentication/login.service';
import {RegistrationService} from '../../auth/registration/registration.service';
import {PASSWORD_LENGTH} from '../../auth/auth-constant';
import {FormControl} from '@angular/forms';
import {APP_NAME} from '../../utils/config';
import {LogService} from '../../common-components/services/log.service';
import {ComponentName} from '../../common-components/services/component-name';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  isLogin;
  retrieveDataResolver;
  userAccount: UserAccount;
  userAvatarLink: string;
  checkedMale: string;
  checkedFemale: string;
  isUpdateError: boolean = false;
  minPasswordLength = PASSWORD_LENGTH;
  isChangePasswordError: boolean = false;
  @ViewChild('confirmChanges') confirmChanges: ElementRef;
  confirmMessage;
  readonly APP_NAME = `${APP_NAME}`;
  private accountName: string;
  private newAccountName: string;
  private oldUser;

  constructor(private loginService: LoginService,
              private userAccountService: UserAccountService,
              private registrationService: RegistrationService,
              private log: LogService) { }

  ngOnInit() {
    this.isLogin = this.loginService.isLogin();
    this.log.log(ComponentName.USER_ACCOUNT, ` ngOnInit: isLogin: ${this.isLogin}`);
    if (this.isLogin) {
      this.userAccount = this.userAccountService.getUserAccount();
      this.oldUser = {name: this.userAccount.user.name,
                      email: this.userAccount.user.email,
                      gender: this.userAccount.user.gender,
                      age: this.userAccount.user.age};
      this.accountName = this.userAccount.user.name;
      if (this.userAccount.user.gender === Gender.FEMALE) {
        this.userAvatarLink = 'avatar_female.png';
        this.checkedFemale = 'checked';
      } else {
        this.userAvatarLink = 'avatar_male.png';
        this.checkedMale = 'checked';
      }
    }
    this.log.log(ComponentName.USER_ACCOUNT, ` ngOnInit: end`);
  }

  update() {
    this.log.log(ComponentName.USER_ACCOUNT, ` update()`);
    // check if data was changed. If not, enter message
    if (this.checkIfDataEquals()) {
      this.log.log(ComponentName.USER_ACCOUNT, ` update(): data is equal`);
      this.confirmMessage = 'Вы не внесли никаких изменений.';
      this.confirmChanges.nativeElement.click();
    } else {
      this.updatePromise().then(() => { this.afterUpdateActions(); });
    }
  }

  changePassword(password: FormControl, newPassword: FormControl) {
    this.log.log(ComponentName.USER_ACCOUNT, ` changePassword: oldPassword-newPassword: ${password.value} - ${newPassword.value}`);
    this.registrationService.changePassword(password.value, newPassword.value)
      .subscribe(
        () => {
          this.confirmMessage = 'Вы успешно изменили пароль';
          this.confirmChanges.nativeElement.click();
          password.reset();
          newPassword.reset();
        },
        error => {
          this.isChangePasswordError = false;
        }
      );
  }

  private updatePromise(): Promise<any> {
    this.log.log(ComponentName.USER_ACCOUNT, ` updatePromise()`);
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.updateServer();
    });
  }

  private updateServer(): void {
    this.log.log(ComponentName.USER_ACCOUNT, ` updateServer(): userAccount: ${this.userAccount}`);
    this.userAccountService.update(this.userAccount)
      .subscribe(userAccount => {
          this.userAccount = userAccount;
          this.loginService.setUserAccount(userAccount);
          this.newAccountName = userAccount.user.name;
          this.confirmMessage = 'Вы успешно изменили свои данные.';
          this.retrieveDataResolver();
        },
        error => {
          this.log.log(ComponentName.USER_ACCOUNT, ` updateServer(): error: ${error}`);
          this.isUpdateError = true;
        });
  }

  private afterUpdateActions(): void {
    this.log.log(ComponentName.USER_ACCOUNT, ` afterUpdateActions()`);
    if (this.accountName !== this.newAccountName) {
      this.log.log(ComponentName.USER_ACCOUNT, ` account name is changed => reload`);
      location.reload();
    } else {
      this.confirmChanges.nativeElement.click();
    }
  }

  private checkIfDataEquals(): boolean {
    this.log.log(ComponentName.USER_ACCOUNT, ` checkIfDataEquals(): user: ${this.userAccount.user}`);
    this.log.log(ComponentName.USER_ACCOUNT, ` checkIfDataEquals(): oldUser: ${this.oldUser}`);
    return this.userAccount.user.name === this.oldUser.name &&
      this.userAccount.user.email === this.oldUser.email &&
      this.userAccount.user.age === this.oldUser.age &&
      this.userAccount.user.gender === this.oldUser.gender;
  }
}
