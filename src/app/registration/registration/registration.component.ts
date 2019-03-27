import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../profile/user';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('openModalRegistration') openModal: ElementRef; // in html <button id="openModalRegistration" ...>
  registeredUser = new User();
  isNeedToBeRegistered = false;
  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
    console.log('isNeedToBeRegistered ngOnInit: ' + this.isNeedToBeRegistered);
    if (this.isNew()) {
      this.openModal.nativeElement.click(); // @ViewChild
    }
  }

  // registerNewUser() {
  //   this.registrationService.registerNewUser(<User> this.registeredUser)
  //     .subscribe(data => this.registeredUser = data);
  // }

  registerUser() {
    this.registrationService.registerNewUser(<User> this.registeredUser)
      .subscribe(data => this.registeredUser = data);
    this.isNeedToBeRegistered = this.isNew();
    console.log('isNeedToBeRegistered registerUser: ' + this.isNeedToBeRegistered);
  }

  isNew(): boolean {
    console.log('isNew: ' + !this.registrationService.isRegistered());
    return !this.registrationService.isRegistered();
  }
}
