import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {GoalItem, QualityItem, StateItem, tests, ValueCompatibilityAnswers} from './value-compatibility/value-compatibility-answers';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValueCompatibilityService {

  constructor(private http: HttpClient) { }


  /** GET tests list from the server */
  getTestList(): Observable<ValueCompatibilityAnswers> {
    return this.http.get<ValueCompatibilityAnswers>('http://localhost:4200/api/test/testlist');
    // .pipe(
    //     catchError(this.handleError('getTestList', []))
    //   );
  }

  /** save goals (for user with userName=testUser) to server*/
  saveGoalArray(goals: GoalItem[]): Observable<ValueCompatibilityAnswers> {
    return this.http.post<ValueCompatibilityAnswers>('http://localhost:4200/api/test/goal/testUser', goals);
    // .pipe(
    //     catchError(this.handleError('getTestList', []))
    //   );
  }

  /** save states (for user with userName=testUser) to server*/
  saveStateArray(states: StateItem[]): Observable<ValueCompatibilityAnswers> {
    return this.http.post<ValueCompatibilityAnswers>('http://localhost:4200/api/test/state/testUser', states);
    // .pipe(
    //     catchError(this.handleError('getTestList', []))
    //   );
  }

  /** save qualities (for user with userName=testUser) to server*/
  saveQualityArray(qualities: QualityItem[]): Observable<ValueCompatibilityAnswers> {
    return this.http.post<ValueCompatibilityAnswers>('http://localhost:4200/api/test/quality/testUser', qualities);
    // .pipe(
    //     catchError(this.handleError('getTestList', []))
    //   );
  }
}
