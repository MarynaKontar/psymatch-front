import { Injectable } from '@angular/core';
import {User} from '../profile/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API_URL} from '../utils/config';
import {RegistrationService} from '../registration/registration.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  uri = `${API_URL}`;

  constructor(private http: HttpClient, private registrationService: RegistrationService) { }

  login(user: User): Observable<HttpResponse<User>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    // const loggedUser: Observable<HttpResponse<User>> = this.http.post<User>(this.uri + `/auth/login`, user, httpOptions);
    // console.log(loggedUser);
    // this.saveTokenToLocalStorage(loggedUser);
    // this.saveHaveAgeAndGenderToLocaleStorage(loggedUser);
    // this.registrationService.setIsRegistered();
    return this.http.post<User>(this.uri + `/auth/login`, user, httpOptions);
  }


  saveTokenToLocalStorage(httpResponse: HttpResponse<User>) {
    localStorage.setItem('token', httpResponse.headers.get('AUTHORIZATION'));
    console.log('token: ',  httpResponse.headers.get('AUTHORIZATION'));
  }

  setIsValueCompatibilityTestPassed(httpResponse: HttpResponse<User>) {
    localStorage.setItem('isValueCompatibilityTestPassed', httpResponse.headers.get('isValueCompatibilityTestPassed'));
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
    localStorage.removeItem('token');
    localStorage.removeItem('haveAgeAndGender');
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('friendsTokens');
  }

  ifHaveTokenInLocalStorage() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');

  }

}
