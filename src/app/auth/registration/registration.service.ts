import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User, UserAccount} from '../../profile/user';
import {API_URL} from '../../utils/config';
import {LogService} from '../../common-components/services/log.service';
import {ComponentName} from '../../common-components/services/component-name';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  uri = `${API_URL}`;
  constructor(
    private http: HttpClient,
    private log: LogService) {
  }

// TODO убрать (проверить, чтобы через интерсептор работало)
  /** POST: add a fully new user or add an anonim user to the server (database) */
  registerNewUser(user: User): Observable<HttpResponse<UserAccount>> {
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` registerNewUser(): ${user}`);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    // take token (if it is in localStorage) from localstorage (throw token-interceptor) and push it to backend to save new user data(email, password) for that anonim user
    return this.http.post<UserAccount>(this.uri + `/registration`, user, httpOptions);
    // .pipe(
    //   catchError(this.handleError('add', user))
    // ;
  }

  /** POST: register anonim user with a name, age and gender */
  anonimRegistration(user: User): Observable<User> {
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` anonimRegistration(): ${user}`);
    return this.http.post<User>(this.uri + `/user/anonimRegistration`, user);
  }

  isRegistered(): boolean {
    const isRegistered = localStorage.getItem('isRegistered') === 'true';
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` isRegistered(): ${isRegistered}`);
    return isRegistered;
  }

  setIsRegistered(user: User) {
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` setIsRegistered(): ${user}`);
    // предполагаем, что пользователь зарегистрирован, если у него есть name и email
    localStorage.setItem('isRegistered', (user.name != null && user.email != null) ? 'true' : 'false');
  }

  setIsAnonimRegistered(user: User) {
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` setIsAnonimRegistered(): ${user}`);
    localStorage.setItem('isAnonimRegistered', (user.name != null && user.age != null && user.gender != null) ? 'true' : 'false');
  }

  isAnonimRegistered(): boolean {
    const token = localStorage.getItem('token');
    const isAnonimRegistered = localStorage.getItem('isAnonimRegistered') === 'true';
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` isAnonimRegistered(): token: ${token}`);
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` isAnonimRegistered(): isAnonimRegistered: ${isAnonimRegistered}`);
    if (token === null) { return false; }
    if (isAnonimRegistered) { return true; }
    return false;
  }

  changePassword(oldPassword: string, newPassword: string) {
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` changePassword()`);
    return this.http.post<void>(this.uri + `/registration/changePassword`, {oldPassword, newPassword});
  }

  private handleError(error: HttpErrorResponse) {
    this.log.error(ComponentName.REGISTRATION_SERVICE, error, '');
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
