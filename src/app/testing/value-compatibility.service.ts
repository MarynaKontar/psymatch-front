import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ValueCompatibilityAnswers} from './value-compatibility/value-compatibility-answers';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ValueProfileIndividual} from './value-compatibility-profile/value-profile';
import {User} from '../profile/user';
import {API_URL} from '../utils/config';
import {UserAccountService} from '../profile/user-account.service';
import {LogService} from '../common-components/services/log.service';
import {ComponentName} from '../common-components/services/component-name';

@Injectable({
  providedIn: 'root'
})
export class ValueCompatibilityService {

  uri = `${API_URL}`;

  constructor(private http: HttpClient,
              private userAccountService: UserAccountService,
              private log: LogService) { }

  /** GET tests list from the server */
  getTestList(): Observable<ValueCompatibilityAnswers> {
    return this.http.get<ValueCompatibilityAnswers>(this.uri + `/test/initTest`);
    // .pipe(
    //     catchError(this.handleError('getTestList', []))
    //   );
  }

  /** save goals to server*/
  // Return Observable<HttpResponse<ValueCompatibilityAnswers>>, not the  Observable<ValueCompatibilityAnswers>
  // because not only the body is needed, but also the response header,
  // in which the token will come from the backend (for recording in localStorage)
  saveGoalArray(goals: ValueCompatibilityAnswers, token: string): Observable<HttpResponse<ValueCompatibilityAnswers>> {
   this.log.log(ComponentName.VALUE_COMPATIBILITY_SERVICE, `saveGoalArray(): `, goals);
    let headers: HttpHeaders;
    let userForMatchingToken = this.userAccountService.getUserForMatchingToken();
    if (token) {
      this.log.log(ComponentName.VALUE_COMPATIBILITY_SERVICE, `saveGoalArray(): isToken: ${token}`);
      headers = new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': token});
    } else if (userForMatchingToken) {
      this.log.log(ComponentName.VALUE_COMPATIBILITY_SERVICE, `saveGoalArray(): isUserForMatchingToken: ${userForMatchingToken}`);
      headers = new HttpHeaders({ 'Content-Type': 'application/json',
        'userForMatchingToken': userForMatchingToken});
    } else {
      this.log.log(ComponentName.VALUE_COMPATIBILITY_SERVICE, `saveGoalArray(): no tokens`);
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
    this.log.log(ComponentName.VALUE_COMPATIBILITY_SERVICE, `saveStateArray(): `, states);
    return this.http.post<ValueCompatibilityAnswers>(this.uri + `/test/state`, states);
  }

  /** save qualities to server*/
  saveQualityArray(qualities: ValueCompatibilityAnswers): Observable<ValueCompatibilityAnswers> {
    this.log.log(ComponentName.VALUE_COMPATIBILITY_SERVICE, `saveQualityArray(): `, qualities);
    return this.http.post<ValueCompatibilityAnswers>(this.uri + `/test/quality`, qualities);
    }

  /** Get value profile for last test for user from server */
  getValueProfile(user: User): Observable<ValueProfileIndividual> {
    this.log.log(ComponentName.VALUE_COMPATIBILITY_SERVICE, `getValueProfile(): `, user);
    return this.http.post<ValueProfileIndividual>(this.uri + `/test/value-profile`, user);
  }
}
