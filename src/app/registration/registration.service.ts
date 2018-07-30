import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../profile/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {
  }

  /** POST: add a new user to the server (database) */
  add(user: User): Observable<User> {
    const url = 'http://localhost:4200/api/user/add';
    return this.http.post<User>(url, user, httpOptions);
    // .pipe(
    //   catchError(this.handleError('add', user))
  }

}
