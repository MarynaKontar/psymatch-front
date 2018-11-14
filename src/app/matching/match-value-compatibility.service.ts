import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../profile/user';

@Injectable({
  providedIn: 'root'
})
export class MatchValueCompatibilityService {

  constructor(private http: HttpClient) { }

  /** !!!  Поменять !!!
   * Match value-compatibility test for two users and save result to server **/
  matchPearson(): Observable<any> {
    return this.http.post('http://localhost:4200/api/match/Pearson', null);
  }


  /** !!!  Поменять !!!
   * Match value-compatibility test for two users and save result to server **/
  matchPercent(): Observable<any> {
    return this.http.post('http://localhost:4200/api/match/Percent', null);
  }

  getUsersForMatching(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:4200/api/match/getUsersForMatching');
  }
}
