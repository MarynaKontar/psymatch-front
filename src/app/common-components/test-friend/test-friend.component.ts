import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../auth/authentication/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DeactivationLoginRegistrationGuarded} from '../../guard/can-deactivate.guard';
import {UserAccountService} from '../../profile/user-account.service';
import {RegistrationService} from '../../auth/registration/registration.service';
import {LogService} from '../services/log.service';
import {ComponentName} from '../services/component-name';

@Component({
  selector: 'app-test-friend',
  templateUrl: './test-friend.component.html',
  styleUrls: ['./test-friend.component.scss']
})
export class TestFriendComponent  extends DeactivationLoginRegistrationGuarded implements OnInit {

  constructor(userAccountService: UserAccountService,
    loginService: LoginService,
    registrationService: RegistrationService,
    router: Router,
    activatedRoute: ActivatedRoute,
    log: LogService) {
    super(loginService, registrationService, userAccountService, router, activatedRoute, log);
  }

  ngOnInit() {
  }
  testAnotherUser() {
    if ( super.canDeactivate() ) {
      this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): super.canDeactivate=TRUE`);
      const token = this.loginService.getToken();
      if (token) {
        this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): TOKEN=TRUE`);
        this.loginService.logout();
        this.userAccountService.setUserForMatchingToken(token);
        this.router.navigate(['vc-test-instruction']);
      } else {
        this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): TOKEN=FALSE`);
        this.router.navigate(['vc-test-instruction']);
      }
    } else {
      this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): super.canDeactivate=FALSE`);
    }
  }
}
