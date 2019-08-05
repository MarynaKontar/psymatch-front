import {Component, OnInit} from '@angular/core';
import {MatchValueCompatibilityService} from '../match-value-compatibility.service';
import {UserAccountService} from '../../profile/user-account.service';
import {PageUserAccount, User, UserAccount} from '../../profile/user';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationService} from '../../pagination/pagination.service';
import {DeactivationLoginRegistrationGuarded} from '../../guard/can-deactivate.guard';
import {LoginService} from '../../auth/authentication/login.service';
import {RegistrationService} from '../../auth/registration/registration.service';
import {LogService} from '../../common-components/services/log.service';
import {ComponentName} from '../../common-components/services/component-name';

@Component({
  selector: 'app-match-home-page',
  templateUrl: './match-home-page.component.html',
  styleUrls: ['./match-home-page.component.scss']
})
export class MatchHomePageComponent extends DeactivationLoginRegistrationGuarded implements OnInit {
  isLogin;
  isValueCompatibilityTestPassed;
  userAccounts: UserAccount[];
  userForMatchingAccounts: UserAccount[];
  pageUserAccount: PageUserAccount;
  private retrieveDataResolver;

  // pagination
  pagination: any = {};
  pagedItems: any[];
  pageSizeDefault = 8;

  constructor(userAccountService: UserAccountService,
              loginService: LoginService,
              registrationService: RegistrationService,
              router: Router,
              activatedRoute: ActivatedRoute,
              log: LogService,
              private matchValueCompatibilityService: MatchValueCompatibilityService,
              private paginationService: PaginationService) {
    super(loginService, registrationService, userAccountService, router, activatedRoute, log);
  }

  ngOnInit() {
    this.log.log(ComponentName.MATCH_HOME_PAGE, `ngOnInit`);
    this.isValueCompatibilityTestPassed = this.loginService.isValueCompatibilityTestPassed();
    this.isLogin = this.loginService.isLogin();
    this.log.log(ComponentName.MATCH_HOME_PAGE, `ngOnInit: isLogin: ${this.isLogin}`);
    this.log.log(ComponentName.MATCH_HOME_PAGE, `ngOnInit: isValueCompatibilityTestPassed: ${this.isValueCompatibilityTestPassed}`);
    if (this.isLogin && this.isValueCompatibilityTestPassed) {
      this.getPageOfUsers(1, this.pageSizeDefault);
      this.getUsersForMatching();
    }
  }

  getPageOfUsers(page: number, pageSize: number = this.pageSizeDefault) {
    this.retrieveGetPageableUsersPromise(page, pageSize)
      .then(() => { this.afterGetPageableUsersActions(page, pageSize); });
  }

  getUsersForMatching() {
    this.log.log(ComponentName.MATCH_HOME_PAGE, `getUsersForMatching()`);
    this.userAccountService.getAllRegisteredAndPassedTestUsersForMatching().subscribe(data => {
      this.log.log(ComponentName.MATCH_HOME_PAGE, `getUsersForMatching(): `, data);
      this.userForMatchingAccounts = data;
    });
  }

  public match(user: User): void {
    this.log.log(ComponentName.MATCH_HOME_PAGE, `match: `, user);
    this.matchValueCompatibilityService.setUserForMatching(user);
    this.router.navigate(['match']);
  }

  // invite(id: string): void {
  //   this.log.log(ComponentName.MATCH_HOME_PAGE, `invite: `, id);
  //   let userAccountForInvite: UserAccount;
  //   this.userAccounts.forEach(userAccount => {
  //     if (userAccount.user.id === id) {
  //       userAccountForInvite = userAccount;
  //     }
  //   });
  //   userAccountForInvite = this.userAccounts[2];
  //   userAccountForInvite = this.userAccounts.find(userAccount1 => userAccount1.user.id === id);
  //   this.log.log(ComponentName.MATCH_HOME_PAGE, `invite: userAccountForInvite: `, userAccountForInvite);
  //   this.matchValueCompatibilityService.inviteForMatching(userAccountForInvite).subscribe(
  //
  //   );
  // }

// =============== SYNCHRONIZE RETRIEVING DATA FROM SERVER ==========================
  private retrieveGetPageableUsersPromise(page: number, pageSize: number): Promise<any> {
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.getPageableUsers(page, pageSize);
    });
  }

  private getPageableUsers(page: number, size: number)  {
    // your async retrieval data logic goes here
    this.log.log(ComponentName.MATCH_HOME_PAGE, `getPageableUsers(${page}, ${size})`);
    this.userAccountService.getAllRegisteredAndPassedTestUsers(page, size)
      .subscribe(data => {
        this.log.log(ComponentName.MATCH_HOME_PAGE, `getPageableUsers(${page}, ${size}): `, data);
        this.pageUserAccount = data;
        this.userAccounts = data.content;
        this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
      });
  }

  private afterGetPageableUsersActions(page: number, pageSize: number): void {
    this.log.log(ComponentName.MATCH_HOME_PAGE, `afterGetPageableUsersActions(${page}, ${pageSize})`);
    this.pagination = this.paginationService.getPager(this.pageUserAccount.totalElements, page, pageSize);
    // get current page of items
    this.pagedItems = this.pageUserAccount.content.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    this.log.log(ComponentName.MATCH_HOME_PAGE, `afterGetPageableUsersActions(${page}, ${pageSize}): pagination: `, this.pagination);
    this.log.log(ComponentName.MATCH_HOME_PAGE, `afterGetPageableUsersActions(${page}, ${pageSize}): pagedItems: `, this.pagedItems);
  }

}
