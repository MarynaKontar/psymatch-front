import {Component, HostListener, Input, OnInit} from '@angular/core';
// import {LoginService} from '../../login/login.service';
import {Gender, UserAccount} from '../user';
import {UserAccountService} from '../user-account.service';
import {SendingTokensService} from '../../common-components/sending-tokens/sending-tokens.service';
import {LoginService} from '../../login/login.service';
import {RegistrationService} from '../../registration/registration.service';
import {SendingTokensComponent} from '../../common-components/sending-tokens/sending-tokens.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  userAccount: UserAccount;
  userAvatarLink: string;
  checkedMale: string;
  checkedFemale: string;
  isUpdateError: boolean;

  // @Input() openTokensPage: SendingTokensComponent; //for open this component on button click in another component(UserAccountComponent). Not work yet
  // https://stackblitz.com/edit/angular-communication-1?file=app%2Fside-bar-toggle%2Fside-bar-toggle.component.ts


  constructor(private loginService: LoginService,
              private userAccountService: UserAccountService,
              private registrationService: RegistrationService,
              private sendingTokensService: SendingTokensService) { }

  ngOnInit() {
    // this.openTokensPage = false;
    if (this.loginService.isLogin() && this.registrationService.isRegistered()) {
      this.userAccount = this.userAccountService.getUserAccount();
      if (this.userAccount.user.gender === Gender.FEMALE) {
        this.userAvatarLink = 'avatar_female.png';
        this.checkedFemale = 'checked';
      } else {
        this.userAvatarLink = 'avatar_male.png';
        this.checkedMale = 'checked';
      }
    }
  }

  // @HostListener('click')
  // openTokens() {
  //   this.sendingTokensService.setIfNotChangeHowManyTimesOpenInviteTokenLinks(false);
  //   this.openTokensPage.toggle();
  // }

  update() {
    this.userAccountService.update(this.userAccount)
      .subscribe(userAccount => {
          this.userAccount = userAccount;
          console.log(userAccount);
          this.loginService.setUserAccount(userAccount);
        },
        error => {
          this.isUpdateError = true;

        });
  }
}
