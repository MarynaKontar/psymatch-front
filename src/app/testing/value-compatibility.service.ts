import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ValueCompatibilityAnswers} from './value-compatibility/value-compatibility-answers';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {ValueProfile} from './value-compatibility-profile/value-profile';
import {User} from '../profile/user';

@Injectable({
  providedIn: 'root'
})
export class ValueCompatibilityService {

  constructor(private http: HttpClient) { }

  /** GET tests list from the server */
  getTestList(): Observable<ValueCompatibilityAnswers> {
    return this.http.get<ValueCompatibilityAnswers>('http://localhost:4200/api/test/initTest');
    // .pipe(
    //     catchError(this.handleError('getTestList', []))
    //   );
  }

  /** save goals to server*/
  // TODO возвращаю Observable<HttpResponse<ValueCompatibilityAnswers>>, а не  Observable<ValueCompatibilityAnswers> потому, что надо
  // не только body, но и header ответа, в котором прийдет токен с бекенда (для записи в localStorage)
  // saveGoalArray(goals: ValueCompatibilityAnswers): Observable<ValueCompatibilityAnswers> {
  //   return this.http.post<ValueCompatibilityAnswers>('http://localhost:4200/api/test/goal', goals);
  // }
  saveGoalArray(goals: ValueCompatibilityAnswers, token: string): Observable<HttpResponse<ValueCompatibilityAnswers>> {
    let headers: HttpHeaders;
    if (token) {
      console.log('ValueCompatibilityService saveGoalArray: ' + token);
      // TODO если в localStorage в это время лежит другой токен, то во время перехвата этого запроса interceptor в 'Authorization'
      // вставится именно токен из localStorage. Т.е. если какой-то залогиненный пользователь зайдет по ссылке с токеном, то все равно
      // все будет сохраняться ему, а не на "новый токен"
      headers = new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': token});
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    }

    const httpOptions = {
      headers: headers,
      observe: 'response' as 'response'
    };
    return this.http.post<ValueCompatibilityAnswers>('http://localhost:4200/api/test/goal',
      goals, httpOptions);
  }

  /** save states to server*/
  saveStateArray(states: ValueCompatibilityAnswers): Observable<ValueCompatibilityAnswers> {
    return this.http.post<ValueCompatibilityAnswers>('http://localhost:4200/api/test/state', states);
  }
  // saveStateArray(states: ValueCompatibilityAnswers): Observable<HttpResponse<ValueCompatibilityAnswers>> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
  //       'AUTHORIZATION': localStorage.getItem('token')}),
  //     observe: 'response' as 'response'
  //   };
  //   return this.http.post<ValueCompatibilityAnswers>('http://localhost:4200/api/test/state', states, httpOptions);
  //   // .pipe(
  //   //     catchError(this.handleError('getTestList', []))
  //   //   );
  // }

  /** save qualities to server*/
  saveQualityArray(qualities: ValueCompatibilityAnswers): Observable<ValueCompatibilityAnswers> {
    return this.http.post<ValueCompatibilityAnswers>('http://localhost:4200/api/test/quality', qualities);
    }

  /** Get value profile for last test for user from server */
  getValueProfile(user: User): Observable<ValueProfile> {
    return this.http.post<ValueProfile>('http://localhost:4200/api/test/value-profile', user);
  }

  /** Get value profiles from server for last test for two users: principal and "user" */
  getValueProfiles(user: User): Observable<ValueProfile[]> {
    return this.http.post<ValueProfile[]>('http://localhost:4200/api/match/value-profile-for-matching', user);
  }

  getLinksWithToken() {
    return this.http.get('http://localhost:4200/api/test/generateTokenList');
  }
}
