import {Component, OnInit} from '@angular/core';
import {MatchValueCompatibilityService} from '../match-value-compatibility.service';
import {UserAccountService} from '../../profile/user-account.service';
import {PageUserAccount, User, UserAccount} from '../../profile/user';
import {Router} from '@angular/router';
import {PaginationService} from '../../pagination/pagination.service';
import {DeactivationGuarded, DeactivationLoginRegistrationGuarded} from '../../guard/can-deactivate.guard';
import {Observable} from 'rxjs';
import {LoginService} from '../../login/login.service';
import {RegistrationService} from '../../registration/registration.service';

@Component({
  selector: 'app-match-home-page',
  templateUrl: './match-home-page.component.html',
  styleUrls: ['./match-home-page.component.scss']
})
export class MatchHomePageComponent extends DeactivationLoginRegistrationGuarded implements OnInit {
  userAccounts: UserAccount[];
  pageUserAccount: PageUserAccount;
  // pagination object
  pagination: any = {};
  // paged items
  pagedItems: any[];
  selectedPage = 0;
  pageSizeDefault: number = 3;
  private retrieveDataResolver;
  constructor(private userAccountService: UserAccountService,
              loginService: LoginService,
              registrationService: RegistrationService,
              router: Router,
              private matchValueCompatibilityService: MatchValueCompatibilityService,
              private paginationService: PaginationService) {
    super(loginService, registrationService, router);
  }

  ngOnInit() {
    this.setPage(1, this.pageSizeDefault);
  }
  // // if the user is not registered, warn that some information may not be saved (see unloadNotification method in DeactivationGuard)
  // canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.loginService.isLogin() && this.registrationService.isRegistered();
  // }

  setPage(page: number, pageSize: number = this.pageSizeDefault) {
    this.retrieveGetAllPromise(page, pageSize).then(() => { this.afterSaveGoalActions(page, pageSize); });
    // this.getAll(page, pageSize);
    // // get pagination object from service
    // setTimeout(() => {
    //
    // }, 500);
  }



//        !!!!!!!!!!!!!!!!!!!! SYNCHRONIZE RETRIEVING DATA FROM SERVER !!!!!!!!!!!!!!!!!!
  private afterSaveGoalActions(page: number, pageSize: number): void {
    console.log('SETPAGE1');
    this.pagination = this.paginationService.getPager(this.pageUserAccount.totalElements, page, pageSize);
    console.log('SETPAGE2: ', this.pagination);
    // get current page of items
    this.pagedItems = this.pageUserAccount.content.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    console.log('SETPAGE3: ', this.pagedItems);
  }

  private getAll(page: number, size: number)  {
    // your async retrieval data logic goes here
    console.log('MHomePC-GET-ALL: ' + page + ':' + size.toString());
    this.userAccountService.getAll(page, size)
      .subscribe(data => {
        console.log('MHomePC-GETALL-DATA: ', data);
        this.pageUserAccount = data;
        this.userAccounts = data.content;
        this.retrieveDataResolver(); // <--- This must be called as soon as the data are ready to be displayed
      });
    console.log('MHomePC-GET-ALL2');
  }

  private retrieveGetAllPromise(page: number, pageSize: number): Promise<any> {
    return new Promise((resolve) => {
      this.retrieveDataResolver = resolve;
      this.getAll(page, pageSize);
    });
  }

  // onSelect(page: number): void {
  //   console.log('selected page : ' + page);
  //   this.selectedPage = page;
  //   this.getAll(page, 3);
  // }

  public match(user: User): void {
    console.log('MHomePC-MATCH-SET-USER-FOR-MATCHING: ', user);
    this.matchValueCompatibilityService.setUserForMatching(user);
    console.log('MHomePC-MATCH-GET-USER-FOR-MATCHING: ', this.matchValueCompatibilityService.getUserForMatching());
    this.router.navigate(['match']);
  }

  invite(id: string): void {
    console.log('invite: ', id);
    let userAccountForInvite: UserAccount;
    // this.userAccounts.forEach(userAccount => {
    //   if (userAccount.user.id === id) {
    //     userAccountForInvite = userAccount;
    //   }
    // });
    // userAccountForInvite = this.userAccounts[2];
    // userAccountForInvite = this.userAccounts.find(userAccount1 => userAccount1.user.id === id);
    console.log('invite: ', userAccountForInvite);
    this.matchValueCompatibilityService.inviteForMatching(userAccountForInvite).subscribe(

    );
  }
}
