import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User, UserAccount} from '../../profile/user';
import {RegistrationService} from '../registration.service';
import {LoginService} from '../../login/login.service';
import {UserAccountService} from '../../profile/user-account.service';

@Component({
  selector: 'app-anonim-registration',
  templateUrl: './anonim-registration.component.html',
  styleUrls: ['./anonim-registration.component.scss']
})
export class AnonimRegistrationComponent implements OnInit {

  @ViewChild('openModalAnonimRegistration') openModal: ElementRef; // in html <button id="openModalAnonimRegistration" ...>
  user = new User();
  user1 = new User();
  isAnonimRegistered = false;
  isVisible;
  private userAccount: UserAccount;
  private returnUrl: string;
  constructor(private registrationService: RegistrationService,
              private loginService: LoginService,
              private userAccountService: UserAccountService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('AnonimRegistrationComponent' );
    this.isVisible = this.loginService.isValueCompatibilityTestPassed() && !this.registrationService.isAnonimRegistered();
    console.log('isVisible: ', this.isVisible);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log('isAnonimRegistered: ', !this.registrationService.isAnonimRegistered() && this.isVisible);
    if (this.isVisible) {
      this.openModal.nativeElement.click(); // @ViewChild
    } else { this.router.navigateByUrl(this.returnUrl); }
  }

  saveAnonim() {
    this.registrationService.anonimRegistration(<User> this.user)
      .subscribe(data => {
        console.log('saveAnonim' + data);
        this.user = data;
        this.setAnonimRegistered();
        this.userAccount = this.userAccountService.getUserAccount();
        this.user1 = this.userAccount.user;
        this.user1.name = this.user.name;
        this.user1.age = this.user.age;
        this.user1.gender = this.user.gender;
        this.userAccount.user = this.user1;
        this.userAccountService.setUserAccount(this.userAccount);
        this.router.navigateByUrl(this.returnUrl);
        // location.reload();
      });
    this.isAnonimRegistered = this.registrationService.isAnonimRegistered();
    // this.router.navigate(['value-profile']); // обновить страничку value-profile, чтобы появилость окно tokens. НЕ ОБНОВЛЯЕТСЯ

  }

  setAnonimRegistered() {
    this.registrationService.setIsAnonimRegistered(this.user);
  }

}
