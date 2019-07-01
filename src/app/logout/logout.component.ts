import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  logout() {
    console.log('LOGOUT-COMPONENT: logout()');
    this.loginService.logout();
    location.reload(); // need to update account user name in header navigation
  }

}
