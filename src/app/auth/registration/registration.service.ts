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

  /** POST: add a fully new user or add registration info to an anonim user to the server (database) */
  registration(user: User): Observable<HttpResponse<UserAccount>> {
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` registerNewUser(): `, user);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    return this.http.post<UserAccount>(this.uri + `/registration`, user, httpOptions);
    // .pipe(
    //   catchError(this.handleError('add', user))
    // ;
  }

  /** POST: incomplete user registration (only name, age and gender) */
  incompleteRegistration(user: User): Observable<User> {
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` incompleteRegistration(): `, user);
    return this.http.post<User>(this.uri + `/user/incompleteRegistration`, user);
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

  setIsIncompleteRegistered(user: User) {
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` setIsIncompleteRegistered(): ${user}`);
    localStorage.setItem('isIncompleteRegistered', (user.name != null && user.age != null && user.gender != null) ? 'true' : 'false');
  }

  isIncompleteRegistered(): boolean {
    const token = localStorage.getItem('token');
    const isIncompleteRegistered = localStorage.getItem('isIncompleteRegistered') === 'true';
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` isIncompleteRegistered(): token: ${token}`);
    this.log.log(ComponentName.REGISTRATION_SERVICE, ` isIncompleteRegistered(): isIncompleteRegistered: ${isIncompleteRegistered}`);
    if (token === null) { return false; }
    if (isIncompleteRegistered) { return true; }
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
