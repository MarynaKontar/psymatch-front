import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {LogService} from '../../../common-components/services/log.service';
import {ComponentName} from '../../../common-components/services/component-name';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private log: LogService) { }

  ngOnInit() {
  }
  logout() {
    this.log.log(ComponentName.LOGOUT, ` logout()`);
    this.loginService.logout();
    location.reload(); // need to update account user name in header navigation
  }
}
