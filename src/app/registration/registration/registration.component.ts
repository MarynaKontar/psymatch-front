import { Component, OnInit } from '@angular/core';
import {User} from '../../profile/user';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registeredUser = new User();
  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  registerUser() {
    this.registrationService.add(<User> this.registeredUser)
      .subscribe(data => this.registeredUser = data);
  }

  registerNewUser() {
    this.registrationService.addNewUser(<User> this.registeredUser)
      .subscribe(data => this.registeredUser = data);
  }

  isNew(): boolean {
    return localStorage.getItem('token') == null;
  }
}
