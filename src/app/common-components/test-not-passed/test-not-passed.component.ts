import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../auth/authentication/login.service';
import {LogService} from '../services/log.service';
import {ComponentName} from '../services/component-name';

@Component({
  selector: 'app-test-not-passed',
  templateUrl: './test-not-passed.component.html',
  styleUrls: ['./test-not-passed.component.scss']
})
export class TestNotPassedComponent implements OnInit {
  isVisible;
  constructor(
    private loginService: LoginService,
    private log: LogService
  ) { }

  ngOnInit() {
    this.log.log(ComponentName.TEST_NOT_PASSED, `onInit`);
    this.isVisible = !this.loginService.isValueCompatibilityTestPassed();
    this.log.log(ComponentName.TEST_NOT_PASSED, `isVisible: ${this.isVisible}`);
  }

}
