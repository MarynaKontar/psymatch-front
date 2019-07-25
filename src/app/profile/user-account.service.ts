import { Injectable } from '@angular/core';
import {PageUserAccount, User, UserAccount} from './user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../utils/config';
import {LogService} from '../common-components/services/log.service';
import {ComponentName} from '../common-components/services/component-name';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  uri = `${API_URL}`;
  constructor(private http: HttpClient,
              private log: LogService) { }

  getUserAccount(): UserAccount {
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` getUserAccount()`);
    const userAccount: UserAccount = (localStorage.getItem('userAccount')) ?
                                    JSON.parse(localStorage.getItem('userAccount')) :
                                    new UserAccount(new User());
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` getUserAccount(): userAccount: ${JSON.stringify(userAccount.user)}`);
    return userAccount;
  }
  setUserAccount(userAccount: UserAccount) {
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` setUserAccount(): ${userAccount}`);
    localStorage.setItem('userAccount', JSON.stringify(userAccount));
  }

  update(userAccount: UserAccount): Observable<UserAccount> {
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` update(): ${userAccount}`);
    return this.http.put<UserAccount>(this.uri + `/account`, userAccount);
  }

  getAll(page: number, size: number): Observable<PageUserAccount> {
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` getAll(${page}, ${size})`);
    return this.http.get<PageUserAccount>(this.uri + `/account/getAllUsers` + `?page=` + page + `&size=` + size);
  }

  isUserAccount(): boolean {
    const isUserAccount = localStorage.getItem('userAccount') != null;
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` isUserAccount(): ${isUserAccount}`);
    return isUserAccount;
  }
  isUserForMatchingToken() {
    const isUserForMatchingToken = localStorage.getItem('userForMatchingToken') != null &&
                                   localStorage.getItem('userForMatchingToken').length !== 0;
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` isUserForMatchingToken(): ${isUserForMatchingToken}`);
    return isUserForMatchingToken;
  }
  getUserForMatchingToken(): string {
    const token = localStorage.getItem('userForMatchingToken');
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` getUserForMatchingToken(): ${token}`);
    return token;
  }

  setUserForMatchingToken(userForMatchingToken: string) {
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` setUserForMatchingToken()`);
    localStorage.setItem('userForMatchingToken', userForMatchingToken);
  }

  inviteForMatching(userAccountForInvite: UserAccount): Observable<UserAccount> {
    this.log.log(ComponentName.USER_ACCOUNT_SERVICE, ` inviteForMatching()`);
    return this.http.post<UserAccount>(this.uri + `/account/inviteForMatching`, userAccountForInvite);
  }
}
