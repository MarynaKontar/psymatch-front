import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-test-friend-button',
  templateUrl: './test-friend-button.component.html',
  styleUrls: ['./test-friend-button.component.scss']
})
export class TestFriendButtonComponent implements OnInit {
  isVisible: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.isVisible = this.loginService.isValueCompatibilityTestPassed();
  }

}
