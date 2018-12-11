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
  /** POST: add an anonim user (that has token) to the server (database) */
  add(user: User): Observable<User> {
    // take token from localstorage and push it to backend to save new user data(email, password) for that anonim user
    return this.http.post<User>(this.uri + `/user`, user, httpOptions);
    // .pipe(
    //   catchError(this.handleError('add', user))
    // ;
  }

  /** POST: add a fully new user to the server (database) */
  addNewUser(user: User): Observable<User> {
    return this.http.post<User>(this.uri + `/user/save`, user);
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
