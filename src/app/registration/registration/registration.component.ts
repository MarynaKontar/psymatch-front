import { Component, OnInit } from '@angular/core';
import {User} from '../../profile/user';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  users: Array<User>;
  registeredUser = {};
  constructor(private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  registerUser() {
    this.registrationService.add(<User> this.registeredUser)
      .subscribe(data => this.registeredUser = data);
  }
}
