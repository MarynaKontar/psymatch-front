import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User, UserAccount} from '../profile/user';
import {API_URL} from '../utils/config';

// const httpOptions = (localStorage.getItem('token')) ?
//   { headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'AUTHORIZATION': localStorage.getItem('token')
//   })} :
//   {headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//     })};
// const httpOptions = { headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//     })};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  uri = `${API_URL}`;
  constructor(private http: HttpClient) {
  }

// TODO убрать (проверить, чтобы через интерсептор работало)
  /** POST: add a fully new user or add an anonim user to the server (database) */
  registerNewUser(user: User): Observable<HttpResponse<UserAccount>> {
    console.log('registerNewUser(): ');
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
    console.log('addNameAgeAndGender'  + user);
    return this.http.post<User>(this.uri + `/user/anonimRegistration`, user);
  }

  isRegistered(): boolean {
    return localStorage.getItem('isRegistered') === 'true';
  }

  setIsRegistered(user: User) {
    // предполагаем, что пользователь зарегистрирован, если у него есть name и email
    localStorage.setItem('isRegistered', (user.name != null && user.email != null) ? 'true' : 'false');
  }

  setIsAnonimRegistered(user: User) {
    console.log('setIsAnonimRegistered'  + user);
    localStorage.setItem('isAnonimRegistered', (user.name != null && user.age != null && user.gender != null) ? 'true' : 'false');
  }

  isAnonimRegistered(): boolean {
    if (localStorage.getItem('token') === null) { return false; }
    if (localStorage.getItem('isAnonimRegistered') === 'true') { return true; }
    return false;
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
