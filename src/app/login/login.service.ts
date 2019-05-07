import { Injectable } from '@angular/core';
import {User, UserAccount} from '../profile/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API_URL} from '../utils/config';
import {RegistrationService} from '../registration/registration.service';
import {UserAccountService} from '../profile/user-account.service';

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
    // const loggedUser: Observable<HttpResponse<User>> = this.http.post<User>(this.uri + `/auth/login`, user, httpOptions);
    // console.log(loggedUser);
    // this.saveTokenToLocalStorage(loggedUser);
    // this.saveHaveAgeAndGenderToLocaleStorage(loggedUser);
    // this.registrationService.setIsRegistered();
    return this.http.post<UserAccount>(this.uri + `/auth/login`, user, httpOptions);
  }

  returnToFriendAccount(): Observable<HttpResponse<UserAccount>> {
    const userForMatchingToken = localStorage.getItem('userForMatchingToken');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'userForMatchingToken': userForMatchingToken}),
      observe: 'response' as 'response'
    };
    this.logout();
    return this.http.post<UserAccount>(this.uri + `/auth/loginFriendAccount`, null, httpOptions);

  }

  setUserAccount(userAccount: UserAccount) {
    this.userAccountService.setUserAccount(userAccount);
  }

  saveTokenToLocalStorage(httpResponse: HttpResponse<UserAccount>) {
    localStorage.setItem('token', httpResponse.headers.get('AUTHORIZATION'));
    console.log('token: ',  httpResponse.headers.get('AUTHORIZATION'));
  }

  setIsValueCompatibilityTestPassed(httpResponse: HttpResponse<UserAccount>) {
    localStorage.setItem('isValueCompatibilityTestPassed', httpResponse.body.isValueCompatibilityTestPassed.toString());
    // headers.get('isValueCompatibilityTestPassed'));
    console.log('isValueCompatibilityTestPassed: ',  httpResponse.headers.get('isValueCompatibilityTestPassed'));
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
    console.log('isLogin(): ', localStorage.getItem('token'));
    return localStorage.getItem('token') != null;

  }
  getToken() {
    return localStorage.getItem('token');
  }

}
