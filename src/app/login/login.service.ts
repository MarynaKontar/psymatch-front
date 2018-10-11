import { Injectable } from '@angular/core';
import {User} from '../profile/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<HttpResponse<User>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };
    return this.http.post<User>('http://localhost:4200/api/auth/login', user, httpOptions);
  }
}
