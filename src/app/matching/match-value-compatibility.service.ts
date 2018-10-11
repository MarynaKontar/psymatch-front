import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchValueCompatibilityService {

  constructor(private http: HttpClient) { }

  /** !!!  Поменять !!!
   * Match value-compatibility test for two users with userName=user1 and user8 and save result to server **/
  matchPearson(): Observable<any> {
    return this.http.post('http://localhost:4200/api/match/Pearson/user1/user8', null);
  }


}
