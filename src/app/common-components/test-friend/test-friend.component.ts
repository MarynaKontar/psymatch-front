import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-friend',
  templateUrl: './test-friend.component.html',
  styleUrls: ['./test-friend.component.scss']
})
export class TestFriendComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  testAnotherUser() {
    const token = this.loginService.getToken();
    if (token) {
      this.loginService.logout();
      localStorage.setItem('userForMatchingToken', token);
      this.router.navigate(['value-compatibility-test']);
    } else { this.router.navigate(['value-compatibility-test']); }
  }


}
