import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ValueCompatibilityAnswers} from './value-compatibility/value-compatibility-answers';
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

}
