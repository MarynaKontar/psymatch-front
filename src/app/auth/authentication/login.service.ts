import {Injectable} from '@angular/core';
import {User, UserAccount} from '../../profile/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API_URL} from '../../utils/config';
import {UserAccountService} from '../../profile/user-account.service';
import {LogService} from '../../common-components/services/log.service';
import {ComponentName} from '../../common-components/services/component-name';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  uri = `${API_URL}`;

  constructor(private http: HttpClient,
              private userAccountService: UserAccountService,
              private log: LogService) { }

  login(user: User): Observable<HttpResponse<UserAccount>> {
    this.log.log(ComponentName.LOGIN_SERVICE, ` login(): ${user.name}`);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    return this.http.post<UserAccount>(this.uri + `/auth/login`, user, httpOptions);
  }

  returnToFriendAccount(): Observable<HttpResponse<UserAccount>> {
    const userForMatchingToken = this.userAccountService.getUserForMatchingToken();
    this.log.log(ComponentName.LOGIN_SERVICE, ` returnToFriendAccount(): userForMatchingToken: ${userForMatchingToken}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'userForMatchingToken': userForMatchingToken}),
      observe: 'response' as 'response'
    };
    return this.http.post<UserAccount>(this.uri + `/auth/loginFriendAccount`, null, httpOptions);

  }

  setUserAccount(userAccount: UserAccount) {
    this.log.log(ComponentName.LOGIN_SERVICE, ` setUserAccount(): ${userAccount}`);
    this.userAccountService.setUserAccount(userAccount);
  }

  saveTokenToLocalStorage(httpResponse: HttpResponse<UserAccount>) {
    this.log.log(ComponentName.LOGIN_SERVICE, ` saveTokenToLocalStorage(): token ${httpResponse.headers.get('AUTHORIZATION')}`);
    localStorage.setItem('token', httpResponse.headers.get('AUTHORIZATION'));
  }

  setIsValueCompatibilityTestPassed(userAccount: UserAccount) {
    this.log.log(ComponentName.LOGIN_SERVICE, ` setIsValueCompatibilityTestPassed()`);
    localStorage.setItem('isValueCompatibilityTestPassed', userAccount.isValueCompatibilityTestPassed.toString());
  }

  isValueCompatibilityTestPassed() {
    const isValueCompatibilityTestPassed = localStorage.getItem('isValueCompatibilityTestPassed') === 'true';
    this.log.log(ComponentName.LOGIN_SERVICE, ` isValueCompatibilityTestPassed(): ${isValueCompatibilityTestPassed}`);
    return isValueCompatibilityTestPassed;
  }

  logout() {
    this.log.log(ComponentName.LOGIN_SERVICE, ` logout()`);
    // localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('isAnonimRegistered');
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('friendsTokens');
    localStorage.removeItem('isValueCompatibilityTestPassed');
    localStorage.removeItem('isGoalsDone');
    localStorage.removeItem('isStatesDone');
    localStorage.removeItem('isQualitiesDone');
    localStorage.removeItem('userAccount');
    localStorage.removeItem('userForMatchingToken');
    localStorage.removeItem('userForMatching');
  }

  isLogin() {
    const isLogin = localStorage.getItem('token') != null && localStorage.getItem('token').length !== 0;
    this.log.log(ComponentName.LOGIN_SERVICE, ` isLogin(): token: ${localStorage.getItem('token')}`);
    return isLogin;

  }
  getToken() {
    const token = localStorage.getItem('token');
    this.log.log(ComponentName.LOGIN_SERVICE, ` getToken()`);
    return token;
  }
}
