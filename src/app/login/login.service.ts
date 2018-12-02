import { Injectable } from '@angular/core';
import {User} from '../profile/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {API_URL} from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  uri = `${API_URL}`;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<HttpResponse<User>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    return this.http.post<User>(this.uri + '/auth/login', user, httpOptions);
  }
}
