import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User, UserAccount} from '../profile/user';
import {UserMatch, ValueProfileMatching} from './match-value-compatibility/match-value-compatibility';
import {API_URL} from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class MatchValueCompatibilityService {
  uri = `${API_URL}`;
  private userForMatching: User;
  constructor(private http: HttpClient) { }

  setUserForMatching(user: User) {
    this.userForMatching = user;
    console.log('MVCService-SET-USER-FOR-MATCHING: ', this.userForMatching);
  }
  getUserForMatching() {
    console.log('MVCService-GET-USER-FOR-MATCHING: ', this.userForMatching);
    return this.userForMatching;
  }

  getAllMatching(): Observable<UserMatch[]> {
    return this.http.get<UserMatch[]>(this.uri + `match/getAll`);
  }

  /** !!!  Поменять Вместо null - выбранного пользователя !!!
   * Match value-compatibility test for two users and save result to server **/
  matchPearson(user: User): Observable<UserMatch> {
    return this.http.post<UserMatch>(this.uri + `/match/Pearson`, user);
  }


  /** !!!  Поменять !!!
   * Match value-compatibility test for two users and save result to server **/
  matchPercent(user: User): Observable<UserMatch> {
    return this.http.post<UserMatch>(this.uri + `/match/Percent`, user);
  }

  getUsersForMatching(): Observable<User[]> {
    return this.http.get<User[]>(this.uri + `/match/getUsersForMatching`);
  }

  /** Get value profiles from server for last test for two users: principal and "user" */
  getValueProfilesForMatching(userId: string): Observable<ValueProfileMatching> {
    return this.http.post<ValueProfileMatching>(this.uri + `/match/value-profile-for-matching`, userId);
  }

  inviteForMatching(userAccountForInvite: UserAccount): Observable<UserAccount> {
    console.log('inviteForMatching service');
    console.log(this.uri + `/account/inviteForMatching`);
    console.log('userAccountForInvite: ', userAccountForInvite);
    // let userAccount: UserAccount;
    // userAccount.user = userAccountForInvite.user;
    // userAccount.isValueCompatibilityTestPassed = userAccountForInvite.isValueCompatibilityTestPassed;
    return this.http.post<UserAccount>(this.uri + `/account/inviteForMatching`, userAccountForInvite);
  }

}
