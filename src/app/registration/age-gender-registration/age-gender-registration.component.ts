import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RegistrationService} from '../registration.service';
import {User} from '../../profile/user';
import {Router} from '@angular/router';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-age-gender-registration',
  templateUrl: './age-gender-registration.component.html',
  styleUrls: ['./age-gender-registration.component.scss']
})
export class AgeGenderRegistrationComponent implements OnInit {
  @ViewChild('openModalAgeGenderRegistration') openModal: ElementRef; // in html <button id="openModalAgeGenderRegistration" ...>
  user = new User();
  isUserHaveAgeAndGender = false;
  isVisible;
  constructor(private registrationService: RegistrationService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    console.log('AgeGenderRegistrationComponent' );
    this.isVisible = this.loginService.isValueCompatibilityTestPassed();
    console.log('isVisible: ', this.isVisible);
    if (!this.registrationService.isHaveAgeAndGender() && this.isVisible) {
      this.openModal.nativeElement.click(); // @ViewChild
    }
  }

  saveAgeAndGender() {
    this.registrationService.addAgeAndGender(<User> this.user)
      .subscribe(data => {
        console.log('saveAgeAndGender' + data);
        this.user = data;
        this.setHaveAgeAndGender();
        location.reload();
      });
    this.isUserHaveAgeAndGender = this.registrationService.isHaveAgeAndGender();
    // this.router.navigate(['value-profile']); // обновить страничку value-profile, чтобы появилость окно tokens. НЕ ОБНОВЛЯЕТСЯ

  }

  setHaveAgeAndGender() {
    this.registrationService.setHaveAgeAndGender(this.user);
  }

}
