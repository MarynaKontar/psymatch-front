import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginService} from '../../auth/authentication/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DeactivationLoginRegistrationGuarded} from '../../guard/can-deactivate.guard';
import {UserAccountService} from '../../profile/user-account.service';
import {RegistrationService} from '../../auth/registration/registration.service';
import {LogService} from '../services/log.service';
import {ComponentName} from '../services/component-name';
import {APP_NAME} from '../../utils/config';

@Component({
  selector: 'app-test-friend',
  templateUrl: './test-friend.component.html',
  styleUrls: ['./test-friend.component.scss']
})
export class TestFriendComponent  extends DeactivationLoginRegistrationGuarded implements OnInit {
  @ViewChild('openModalConfirm') modalConfirm: ElementRef;
  @ViewChild('closeBtn') closeModalConfirm: ElementRef;
  readonly APP_NAME = `${APP_NAME}`;
  isDeactivate: Promise<boolean>;
  private retrieveDataResolver;
  private token;
  constructor(userAccountService: UserAccountService,
    loginService: LoginService,
    registrationService: RegistrationService,
    router: Router,
    activatedRoute: ActivatedRoute,
    log: LogService) {
    super(loginService, registrationService, userAccountService, router, activatedRoute, log);
  }

  ngOnInit() { }

  testAnotherUser() {
    if (this.registrationService.isRegistered()) {
      this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): canDeactivate=TRUE`);
      this.goToTestAnotherUser();
    } else {
      this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): canDeactivate=FALSE`);
      this.modalConfirm.nativeElement.click();
    }
  }

  goToTestAnotherUser () {
    this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): goToTestAnotherUser`);
    this.token = this.loginService.getToken();
    this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): goToTestAnotherUser: TOKEN: ${this.token}`);
    if (this.token) {
      new Promise((resolve) => {
        this.retrieveDataResolver = resolve;
        this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): goToTestAnotherUser: TOKEN: ${this.token}`);
        this.loginService.logout();
        this.userAccountService.setUserForMatchingToken(this.token);
        this.closeModalConfirm.nativeElement.click();
        this.router.navigate(['vc-test-instruction']);
        this.retrieveDataResolver();
      }).then(() => {
        location.reload();
      });
    } else {
      this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): goToTestAnotherUser: TOKEN=FALSE`);
      this.closeModalConfirm.nativeElement.click();
      // will be go to error page
      this.router.navigate(['vc-test-instruction']);
    }
  }
  register() {
    this.closeModalConfirm.nativeElement.click();
    this.router.navigate(['register']);
  }
  // testAnotherUser() {
  //   // this.getPromise().then(() => { this.afterPromiseActions(); });
  //   this.isDeactivate = this.canDeactivate();
  //   this.isDeactivate.then(() => {
  //     if (this.isCanDeactivate) {
  //       this.goToTestAnotherUser();
  //     } else {
  //       // this.retrieveDataResolver();
  //       this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): super.canDeactivate=FALSE`);
  //     }
  //   });
  // }
  //
  // private getPromise(): Promise<any> {
  //   return new Promise((resolver) => {
  //     this.retrieveDataResolver = resolver;
  //     this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): getPromise: `);
  //     this.isDeactivate = this.canDeactivate();
  //     this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): getPromise: ${this.isDeactivate}`);
  //     this.token = this.loginService.getToken();
  //     this.retrieveDataResolver();
  //   });
  // }
  //
  // private afterPromiseActions() {
  //   if ( this.isDeactivate ) {
  //     // this.retrieveDataResolver();
  //     this.goToTestAnotherUser();
  //   } else {
  //     // this.retrieveDataResolver();
  //     this.log.log(ComponentName.TEST_FRIEND, `testAnotherUser(): super.canDeactivate=FALSE`);
  //   }
  // }
}
