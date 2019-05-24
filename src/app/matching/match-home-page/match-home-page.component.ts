import {Component, OnInit} from '@angular/core';
import {MatchValueCompatibilityService} from '../match-value-compatibility.service';
import {UserAccountService} from '../../profile/user-account.service';
import {User, UserAccount} from '../../profile/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-match-home-page',
  templateUrl: './match-home-page.component.html',
  styleUrls: ['./match-home-page.component.scss']
})
export class MatchHomePageComponent implements OnInit {
  userAccounts: UserAccount[];
  constructor(private userAccountService: UserAccountService,
    private router: Router,
    private matchValueCompatibilityService: MatchValueCompatibilityService) { }

  ngOnInit() {
    this.userAccountService.getAll()
      .subscribe(data => {
        this.userAccounts = data;
      });
  }

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
    userAccountForInvite = this.userAccounts[2];
    // userAccountForInvite = this.userAccounts.find(userAccount1 => userAccount1.user.id === id);
    console.log('invite: ', userAccountForInvite);
    this.matchValueCompatibilityService.inviteForMatching(userAccountForInvite).subscribe(

    );
  }
}
