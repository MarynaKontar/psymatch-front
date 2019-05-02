import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../registration/registration.service';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isRegistered: boolean;
  isLogin: boolean;
  isValueCompatibilityTestPassed: boolean;

  constructor(private registrationService: RegistrationService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.isRegistered = this.registrationService.isRegistered();
    this.isLogin = this.loginService.isLogin();
    this.isValueCompatibilityTestPassed = this.loginService.isValueCompatibilityTestPassed();
  }

}
