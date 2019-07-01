import { Injectable } from '@angular/core';
import {PageUserAccount, User, UserAccount} from './user';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../utils/config';
import {ValueProfileMatching} from '../matching/match-value-compatibility/match-value-compatibility';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  uri = `${API_URL}`;
  constructor(private http: HttpClient) { }

  getUserAccount(): UserAccount {
    if (localStorage.getItem('userAccount')) {
      return JSON.parse(localStorage.getItem('userAccount'));
    } else { return new UserAccount(new User()); }
  }
  setUserAccount(userAccount: UserAccount) {
    localStorage.setItem('userAccount', JSON.stringify(userAccount));
  }

  update(userAccount: UserAccount): Observable<UserAccount> {
    return this.http.put<UserAccount>(this.uri + `/account`, userAccount);
  }

  getAll(page: number, size: number): Observable<PageUserAccount> {
    console.log(this.uri + `/account/getAll`);
    return this.http.get<PageUserAccount>(this.uri + `/account/getAllUsers` + `?page=` + page + `&size=` + size);
  }

  isUserAccount(): boolean {
    return localStorage.getItem('userAccount') != null;
  }
  isUserForMatchingToken() {
    if (localStorage.getItem('userForMatchingToken') != null && localStorage.getItem('userForMatchingToken').length !== 0 ) {
      return true;
    }
    return false;
  }
  getUserForMatchingToken(): string {
    return localStorage.getItem('userForMatchingToken');
  }

  setUserForMatchingToken(userForMatchingToken: string) {
    localStorage.setItem('userForMatchingToken', userForMatchingToken);
  }

  inviteForMatching(userAccountForInvite: UserAccount): Observable<UserAccount> {
    console.log('inviteForMatching service');
    console.log(this.uri + `/account/inviteForMatching`);
    return this.http.post<UserAccount>(this.uri + `/account/inviteForMatching`, userAccountForInvite);
  }
}
