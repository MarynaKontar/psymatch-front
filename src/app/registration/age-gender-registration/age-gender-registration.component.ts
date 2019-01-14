import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RegistrationService} from '../registration.service';
import {User} from '../../profile/user';

@Component({
  selector: 'app-age-gender-registration',
  templateUrl: './age-gender-registration.component.html',
  styleUrls: ['./age-gender-registration.component.scss']
})
export class AgeGenderRegistrationComponent implements OnInit {
  @ViewChild('openModalAgeGenderRegistration') openModal: ElementRef; // in html <button id="openModalAgeGenderRegistration" ...>
  user = new User();
  isUserHaveAgeAndGender = false;
  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
    if (!this.isHaveAgeAndGender()) {
      this.openModal.nativeElement.click(); // @ViewChild
    }
  }

  saveAgeAndGender() {
    this.registrationService.addAgeAndGender(<User> this.user)
      .subscribe(data => {
        console.log('saveAgeAndGender'  + data);
        this.user = data;
        this.setHaveAgeAndGender();
      });
    this.isUserHaveAgeAndGender = this.isHaveAgeAndGender();
  }

  isHaveAgeAndGender(): boolean {
    if (localStorage.getItem('token') === null) { return false; }
    if (localStorage.getItem('haveAgeAndGender') === 'true') { return true; }
  }

  setHaveAgeAndGender() {
    this.registrationService.setHaveAgeAndGender(this.user);
  }

}
