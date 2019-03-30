import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-test-not-passed',
  templateUrl: './test-not-passed.component.html',
  styleUrls: ['./test-not-passed.component.scss']
})
export class TestNotPassedComponent implements OnInit {
  isVisible;
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    console.log('TestNotPassedComponent');
    this.isVisible = !this.loginService.isValueCompatibilityTestPassed();
    console.log('TestNotPassedComponent isVisible: ', this.isVisible);
  }

}
