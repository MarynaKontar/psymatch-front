import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../profile/user';
import {UserMatch, ValueProfileMatching} from './match-value-compatibility/match-value-compatibility';
import {API_URL} from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class MatchValueCompatibilityService {
  uri = `${API_URL}`;
  constructor(private http: HttpClient) { }

  /** !!!  Поменять Вместо null - выбранного пользователя !!!
   * Match value-compatibility test for two users and save result to server **/
  matchPearson(): Observable<UserMatch> {
    return this.http.post<UserMatch>(this.uri + '/match/Pearson', null);
  }


  /** !!!  Поменять !!!
   * Match value-compatibility test for two users and save result to server **/
  matchPercent(): Observable<UserMatch> {
    return this.http.post<UserMatch>(this.uri + '/match/Percent', null);
  }

  getUsersForMatching(): Observable<User[]> {
    return this.http.get<User[]>(this.uri + '/match/getUsersForMatching');
  }

  /** Get value profiles from server for last test for two users: principal and "user" */
  getValueProfilesForMatching(user: User): Observable<ValueProfileMatching> {
    return this.http.post<ValueProfileMatching>(this.uri + '/match/value-profile-for-matching', user);
  }

}
