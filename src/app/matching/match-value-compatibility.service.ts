import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User, UserAccount} from '../profile/user';
import {UserMatch, ValueProfileMatching} from './match-value-compatibility/match-value-compatibility';
import {API_URL} from '../utils/config';
import {LogService} from '../common-components/services/log.service';
import {ComponentName} from '../common-components/services/component-name';

@Injectable({
  providedIn: 'root'
})
export class MatchValueCompatibilityService {
  uri = `${API_URL}`;
  private userForMatching: User;
  constructor(private http: HttpClient,
              private log: LogService) { }

  setUserForMatching(user: User) {
    this.userForMatching = user;
    localStorage.setItem('userForMatching', JSON.stringify(user));
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY_SERVICE, `setUserForMatching(): `, user);
  }
  getUserForMatching(): User {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY_SERVICE, `getUserForMatching()`);
    return (localStorage.getItem('userForMatching')) ?
      JSON.parse(localStorage.getItem('userForMatching')) :
      null;
    // return this.userForMatching;
  }

  /** Match value-compatibility test for two users and save result to server **/
  matchPearson(user: User): Observable<UserMatch> {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY_SERVICE, `matchPearson()`);
    return this.http.post<UserMatch>(this.uri + `/match/Pearson`, user);
  }

  /** Match value-compatibility test for two users and save result to server **/
  matchPercent(user: User): Observable<UserMatch> {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY_SERVICE, `matchPercent(): user: `, user);
    return this.http.post<UserMatch>(this.uri + `/match/Percent`, user);
  }

  getUsersForMatching(): Observable<User[]> {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY_SERVICE, `getUsersForMatching()`);
    return this.http.get<User[]>(this.uri + `/match/getUsersForMatching`);
  }

  /** Get value profiles from server for last test for two users: principal and "user" */
  getValueProfilesForMatching(userId: string): Observable<ValueProfileMatching> {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY_SERVICE, `getValueProfilesForMatching(): userId: `, userId);
    return this.http.post<ValueProfileMatching>(this.uri + `/match/value-profile-for-matching`, userId);
  }

  inviteForMatching(userAccountForInvite: UserAccount): Observable<UserAccount> {
    this.log.log(ComponentName.MATCH_VALUE_COMPATIBILITY_SERVICE, `inviteForMatching(): `, userAccountForInvite);
    return this.http.post<UserAccount>(this.uri + `/account/inviteForMatching`, userAccountForInvite);
  }

}
