import {EventEmitter, Injectable, Output} from '@angular/core';
import {User, UserAccount} from '../../profile/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API_URL} from '../../utils/config';
import {UserAccountService} from '../../profile/user-account.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  uri = `${API_URL}`;

  constructor(private http: HttpClient,
              private userAccountService: UserAccountService) { }

  login(user: User): Observable<HttpResponse<UserAccount>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    // console.log(loggedUser);
    // this.saveTokenToLocalStorage(loggedUser);
    // this.saveHaveAgeAndGenderToLocaleStorage(loggedUser);
    // this.registrationService.setIsRegistered();
    return this.http.post<UserAccount>(this.uri + `/auth/login`, user, httpOptions);
  }

  returnToFriendAccount(): Observable<HttpResponse<UserAccount>> {
    const userForMatchingToken = this.userAccountService.getUserForMatchingToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'userForMatchingToken': userForMatchingToken}),
      observe: 'response' as 'response'
    };
    return this.http.post<UserAccount>(this.uri + `/auth/loginFriendAccount`, null, httpOptions);

  }

  setUserAccount(userAccount: UserAccount) {
    this.userAccountService.setUserAccount(userAccount);
  }

  saveTokenToLocalStorage(httpResponse: HttpResponse<UserAccount>) {
    localStorage.setItem('token', httpResponse.headers.get('AUTHORIZATION'));
    console.log('LOGIN-COMPONENT: token: ',  httpResponse.headers.get('AUTHORIZATION'));
  }

  setIsValueCompatibilityTestPassed(userAccount: UserAccount) {
    localStorage.setItem('isValueCompatibilityTestPassed', userAccount.isValueCompatibilityTestPassed.toString());
  }

  isValueCompatibilityTestPassed() {
   return localStorage.getItem('isValueCompatibilityTestPassed') === 'true';
  }

  // saveTokenToLocalStorage(userResponse: Observable<HttpResponse<User>>) {
  //   userResponse.subscribe(response => {
  //       localStorage.setItem('token', response.headers.get('AUTHORIZATION'));
  //       console.log('token: ',  response.headers.get('AUTHORIZATION'));
  //   });
  // }
  //
  // saveHaveAgeAndGenderToLocaleStorage(userResponse: Observable<HttpResponse<User>>) {
  //   userResponse.subscribe(response => {
  //     console.log(response.body);
  //       localStorage.setItem('haveAgeAndGender', (response.body.age != null && response.body.gender != null) ? 'true' : 'false');
  //       console.log('haveAgeAndGender:  ', (response.body.age != null && response.body.gender != null) ? 'true' : 'false');
  //   });
  // }

  logout() {
    console.log('LOGIN-SERVICE: logout()');
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
  }

  isLogin() {
    console.log('LOGIN-COMPONENT: isLogin(): ', localStorage.getItem('token'));
    return localStorage.getItem('token') != null && localStorage.getItem('token').length !== 0;

  }
  getToken() {
    return localStorage.getItem('token');
  }
}