import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ValueCompatibilityAnswers} from './value-compatibility/value-compatibility-answers';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ValueProfileIndividual} from './value-compatibility-profile/value-profile';
import {User} from '../profile/user';
import {ValueProfileMatching} from '../matching/match-value-compatibility/match-value-compatibility';
import {API_URL} from '../utils/config';
import {UserAccountService} from '../profile/user-account.service';

@Injectable({
  providedIn: 'root'
})
export class ValueCompatibilityService {

  uri = `${API_URL}`;

  constructor(private http: HttpClient,
              private userAccountService: UserAccountService) { }

  // getUser(id: number): Observable<DataStudent> {
  //   return this.http.get<DataStudent>(`${API_URL}/student/${id}`, {
  //     headers: this.headers
  //   });
  // }

  /** GET tests list from the server */
  getTestList(): Observable<ValueCompatibilityAnswers> {
    return this.http.get<ValueCompatibilityAnswers>(this.uri + `/test/initTest`);
    // .pipe(
    //     catchError(this.handleError('getTestList', []))
    //   );
  }

  /** save goals to server*/
  // TODO возвращаю Observable<HttpResponse<ValueCompatibilityAnswers>>, а не  Observable<ValueCompatibilityAnswers> потому, что надо
  // не только body, но и header ответа, в котором прийдет токен с бекенда (для записи в localStorage)
  saveGoalArray(goals: ValueCompatibilityAnswers, token: string): Observable<HttpResponse<ValueCompatibilityAnswers>> {
   console.log('SERVICE saveGoalArray', goals);
    let headers: HttpHeaders;
    if (token) {
      console.log('ValueCompatibilityService saveGoalArray: ' + token);
      headers = new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': token});
    } else if (this.userAccountService.isUserForMatchingToken()) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json',
        'userForMatchingToken': localStorage.getItem('userForMatchingToken')});
    } else {
      console.log('ValueCompatibilityService saveGoalArray: no token' );
      headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    }

    const httpOptions = {
      headers: headers,
      observe: 'response' as 'response'
    };
    return this.http.post<ValueCompatibilityAnswers>(this.uri + `/test/goal`,
      goals, httpOptions);
  }

  /** save states to server*/
  saveStateArray(states: ValueCompatibilityAnswers): Observable<ValueCompatibilityAnswers> {
    return this.http.post<ValueCompatibilityAnswers>(this.uri + `/test/state`, states);
  }
  // saveStateArray(states: ValueCompatibilityAnswers): Observable<HttpResponse<ValueCompatibilityAnswers>> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  //       'AUTHORIZATION': localStorage.getItem('token')}),
  //     observe: 'response' as 'response'
  //   };
  //   return this.http.post<ValueCompatibilityAnswers>(this.uri + '/test/state', states, httpOptions);
  //   // .pipe(
  //   //     catchError(this.handleError('getTestList', []))
  //   //   );
  // }

  /** save qualities to server*/
  saveQualityArray(qualities: ValueCompatibilityAnswers): Observable<ValueCompatibilityAnswers> {
    return this.http.post<ValueCompatibilityAnswers>(this.uri + `/test/quality`, qualities);
    }

  /** Get value profile for last test for user from server */
  getValueProfile(user: User): Observable<ValueProfileIndividual> {
    console.log('came to getValueProfile:' + user);
    return this.http.post<ValueProfileIndividual>(this.uri + `/test/value-profile`, user);
  }
}
