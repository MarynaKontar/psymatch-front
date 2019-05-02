import { Injectable } from '@angular/core';
import {UserAccount} from './user';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  uri = `${API_URL}`;
  constructor(private http: HttpClient) { }

  getUserAccount(): UserAccount {
   return JSON.parse(localStorage.getItem('userAccount'));
  }
  setUserAccount(userAccount: UserAccount) {
    localStorage.setItem('userAccount', JSON.stringify(userAccount));
  }

  update(userAccount: UserAccount): Observable<UserAccount> {
    return this.http.put<UserAccount>(this.uri + `/account`, userAccount);
  }
}
