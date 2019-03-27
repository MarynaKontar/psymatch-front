import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../profile/user';
import {API_URL} from '../utils/config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'AUTHORIZATION': localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  uri = `${API_URL}`;
  constructor(private http: HttpClient) {
  }

// TODO убрать (проверить, чтобы через интерсептор работало)
  /** POST: add a fully new user or add an anonim user to the server (database) */
  registerNewUser(user: User): Observable<User> {
    // take token from localstorage and push it to backend to save new user data(email, password) for that anonim user
    const registeredUser: Observable<User> = this.http.post<User>(this.uri + `/registration`, user, httpOptions);
    this.setIsRegistered();
    return registeredUser;
    // .pipe(
    //   catchError(this.handleError('add', user))
    // ;
  }

  // /**  POST: add an anonim user (that has token) to the server (database) */
  // registerAnonimUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.uri + `/registration/update`, user);
  // }

  /** POST: add an age and genger of user to the server (database) */
  addAgeAndGender(user: User): Observable<User> {
    console.log('addAgeAndGender'  + user);
    return this.http.post<User>(this.uri + `/user/addAgeAndGender`, user, httpOptions);
  }

  isRegistered(): boolean {
    return localStorage.getItem('isRegistered') === 'true';
  }

  setIsRegistered() {
    localStorage.setItem('isRegistered', 'true');
  }

  setHaveAgeAndGender(user: User) {
    console.log('setHaveAgeAndGender'  + user);
    localStorage.setItem('haveAgeAndGender', (user.age != null && user.gender != null) ? 'true' : 'false');
  }

  isHaveAgeAndGender(): boolean {
    if (localStorage.getItem('token') === null) { return false; }
    if (localStorage.getItem('haveAgeAndGender') === 'true') { return true; }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
